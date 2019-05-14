from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from rest_framework.filters import SearchFilter, OrderingFilter

from api.models import UserApplication, Schedule
from api.serializers import UserApplicationSerializerRead, ScheduleSerializer, UserApplicationSerializerWrite


class ScheduleAPIView(generics.ListCreateAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Schedule.objects.for_user(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)