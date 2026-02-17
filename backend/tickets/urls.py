from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, ticket_stats
from .views import classify_ticket

router = DefaultRouter()
router.register(r'tickets', TicketViewSet)

urlpatterns = [
    path('tickets/stats/', ticket_stats),
    path('tickets/classify/', classify_ticket),  
    path('', include(router.urls)),
]