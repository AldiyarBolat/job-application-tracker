from rest_framework import serializers
from api.models import Status, Company, Position, UserInfo, UserApplication, Schedule
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class StatusSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True, required=False)
    name = serializers.CharField()

    def create(self, validated_data):
        status = Status(**validated_data)
        status.save()
        return status

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class CompanySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True, required=False)
    name = serializers.CharField(required=False)

    def create(self, validated_data):
        company = Company(**validated_data)
        company.save()
        return company

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class PositionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Position
        fields = '__all__'
        read_only_fields = ('id', 'created_by')


class PositionSerializer2(serializers.ModelSerializer):
    company = CompanySerializer(required=True)

    class Meta:
        model = Position
        fields = '__all__'
        read_only_fields = ('id', 'created_by')


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserInfo
        fields = '__all__'


class UserApplicationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    position = PositionSerializer(required=False)
    status = StatusSerializer(required=False)
    created_by = UserSerializer(required=False, read_only=True)

    class Meta:
        model = UserApplication
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.position = validated_data.get('position', instance.position)
        instance.status = validated_data.get('status', instance.status)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.recruiter_contact = validated_data.get('recruiter_contact', instance.recruiter_contact)
        instance.save()
        return instance


class ScheduleSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created_by = UserSerializer(required=False)

    class Meta:
        model = Schedule
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.event_type = validated_data.get('event_type', instance.event_type)
        instance.date = validated_data.get('date', instance.date)
        instance.created_by = validated_data.get('created_by', instance.created_by)
        instance.save()
        return instance


