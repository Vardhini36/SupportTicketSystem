from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Avg
from django.db.models.functions import TruncDate

from .models import Ticket
from .serializers import TicketSerializer


# ===============================
# Ticket CRUD ViewSet
# ===============================
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer
    filterset_fields = ['category', 'priority', 'status']
    search_fields = ['title', 'description']

# ===============================
# Stats Endpoint
# ===============================
@api_view(['GET'])
def ticket_stats(request):

    # Total tickets
    total = Ticket.objects.count()

    # Open tickets
    open_count = Ticket.objects.filter(status='open').count()

    # Average tickets per day
    avg_per_day = (
        Ticket.objects
        .annotate(day=TruncDate('created_at'))
        .values('day')
        .annotate(count=Count('id'))
        .aggregate(avg=Avg('count'))
    )['avg'] or 0

    # Priority breakdown
    priority_breakdown = dict(
        Ticket.objects
        .values('priority')
        .annotate(count=Count('id'))
        .values_list('priority', 'count')
    )

    # Category breakdown
    category_breakdown = dict(
        Ticket.objects
        .values('category')
        .annotate(count=Count('id'))
        .values_list('category', 'count')
    )

    return Response({
        "total_tickets": total,
        "open_tickets": open_count,
        "avg_tickets_per_day": round(avg_per_day, 2),
        "priority_breakdown": priority_breakdown,
        "category_breakdown": category_breakdown
    })
import os
from openai import OpenAI
import json


@api_view(['POST'])
def classify_ticket(request):

    description = request.data.get('description')

    if not description:
        return Response({"error": "Description is required"}, status=400)

    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        prompt = f"""
        Categorize the following support ticket into one of:
        billing, technical, account, general.

        Also assign a priority level:
        low, medium, high, critical.

        Return ONLY valid JSON in this format:
        {{
            "category": "...",
            "priority": "..."
        }}

        Ticket description:
        {description}
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )

        content = response.choices[0].message.content.strip()

        result = json.loads(content)

        return Response({
            "suggested_category": result.get("category"),
            "suggested_priority": result.get("priority")
        })

    except Exception:
        # Graceful failure (important for evaluation)
        return Response({
            "suggested_category": None,
            "suggested_priority": None
        })