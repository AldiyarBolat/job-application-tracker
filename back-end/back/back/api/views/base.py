from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from api.models import User, Company, Status, Position, UserApplication
from api.serializers import StatusSerializer, PositionSerializer, UserSerializer, CompanySerializer, PositionSerializer2, UserApplicationSerializerWrite, UserApplicationSerializerRead


@api_view(['POST', 'GET'])
def status(request):
    if request.method == 'POST':
        serializer = StatusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    if request.method == 'GET':
        data = Status.objects.all()
        serializer = StatusSerializer(data, many=True)
        return Response(serializer.data)


@api_view(['POST', 'GET'])
def position(request):
    if request.method == 'POST':
        serializer = PositionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)
    if request.method == 'GET':
        positions = Position.objects.all()
        serializer = PositionSerializer2(positions, many=True)
        return Response(serializer.data)


class CompanyView(APIView):
    def get_object(self, pk):
        try:
           return Company.objects.get(id=pk)
        except Company.DoesNotExist:
           raise Http404

    def get(self, request, pk):
        company = self.get_object(pk)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, pk):
        company = self.get_object(pk)
        serializer = CompanySerializer(instance=company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        company = self.get_object(pk)
        company.delete()
        return Response({})


class CompaniesView(APIView):
    def get(self, request):
        company = Company.objects.all()
        serializer = CompanySerializer(company, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=self.request.user)
            return Response(serializer.data)
        return Response(serializer.errors)


class UserApplicationView(APIView):

    def get(self, request):
        applications = UserApplication.objects.all()
        serializer = UserApplicationSerializerRead(applications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserApplicationSerializerWrite(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=self.request.user)
            return Response(serializer.data)
        return Response(serializer.errors)


class UserApplicationUpdateDelete(APIView):
    def put(self, request, pk):
        user_application = UserApplication.objects.get(id=pk)
        serializer = UserApplicationSerializerWrite(instance=user_application, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        user_application = UserApplication.objects.get(pk)
        user_application.delete()
        return Response({})


