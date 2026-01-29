from django.db import transaction
from hrms.models import Attendance

def mark_attendance(*, employee, date, status):
    return Attendance.objects.create(
        employee=employee,
        date=date,
        status=status,
    )

def delete_attendance_service(*, pk: int):
    attendance = Attendance.objects.get(pk=pk)
    attendance.delete()

def update_attendance_service(*, pk: int, **data) -> Attendance:
    attendance = Attendance.objects.get(pk=pk)

    for field, value in data.items():
        setattr(attendance, field, value)

    attendance.full_clean()
    attendance.save()
    return attendance