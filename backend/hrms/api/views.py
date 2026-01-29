from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from hrms.api.serializers import EmployeeSerializer, AttendanceSerializer


from hrms.selectors.employee_selector import (
    get_employee_by_id,
    get_all_employees
)

from hrms.selectors.attendance_selector import (
    get_attendance_by_id, 
    get_attendance_by_date_range
)

from hrms.services.employee_service import (
    create_employee, 
    delete_employee, 
    update_employee_service,
)

from hrms.services.attendance_service import (
    mark_attendance,
    delete_attendance_service,
    update_attendance_service
)

class EmployeeViewSet(viewsets.ViewSet):
    def list(self, request):
        employees = get_all_employees()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = EmployeeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            employee = create_employee(**serializer.validated_data)
            return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"error": "Conflict: Employee ID or Email exists."}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            employee = get_employee_by_id(pk)
            return Response(EmployeeSerializer(employee).data)
        except ObjectDoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            employee = get_employee_by_id(pk)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = EmployeeSerializer(
            instance=employee,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)

        updated_employee = update_employee_service(
            pk=pk,
            **serializer.validated_data
        )

        return Response(
            EmployeeSerializer(updated_employee).data,
            status=status.HTTP_200_OK
        )



    def destroy(self, request, pk=None):
        try:
            delete_employee(pk=pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)


class AttendanceViewSet(viewsets.ViewSet):
    def list(self, request):
        employee_id = request.query_params.get("employee")
        if not employee_id:
            return Response({"error": "employee ID required"}, status=status.HTTP_400_BAD_REQUEST)

        records = get_attendance_by_date_range(
            employee_id=employee_id,
            start_date=request.query_params.get("from"),
            end_date=request.query_params.get("to")
        )
        return Response(AttendanceSerializer(records, many=True).data)

    def create(self, request):
        serializer = AttendanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            attendance = mark_attendance(**serializer.validated_data)
            return Response(AttendanceSerializer(attendance).data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({"error": "Attendance already exists for this date"}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            attendance = get_attendance_by_id(pk)
            return Response(AttendanceSerializer(attendance).data)
        except ObjectDoesNotExist:
            return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            attendance = get_attendance_by_id(pk)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Record not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = AttendanceSerializer(
            instance=attendance,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)

        updated_attendance = update_attendance_service(
            pk=pk,
            **serializer.validated_data
        )

        return Response(
            AttendanceSerializer(updated_attendance).data,
            status=status.HTTP_200_OK
        )


    def destroy(self, request, pk=None):
        try:
            delete_attendance_service(pk=pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)