from rest_framework import serializers
from hrms.models import Employee, Attendance

class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for Employee CRUD operations.
    """

    class Meta:
        model = Employee
        fields = [
            "id",
            "employee_id",
            "full_name",
            "email",
            "department",
            "created_at",
        ]

    def validate_email(self, value):
        """
        Extra explicit email validation.
        """
        if not value:
            raise serializers.ValidationError("Email is required")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    """
    Serializer for attendance records.
    """

    class Meta:
        model = Attendance
        fields = [
            "id",
            "employee",
            "date",
            "status",
            "created_at",
        ]
