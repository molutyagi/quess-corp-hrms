from django.db import transaction
from hrms.models import Employee


def create_employee(*, employee_id, full_name, email, department):
    return Employee.objects.create(
        employee_id=employee_id,
        full_name=full_name,
        email=email,
        department=department,
    )

def delete_employee(*, pk: int):
    employee = Employee.objects.get(pk=pk)
    employee.delete()

def update_employee_service(*, pk: int, **data) -> Employee:
    employee = Employee.objects.get(pk=pk)
    for field, value in data.items():
        setattr(employee, field, value)
    employee.full_clean()
    employee.save()
    return employee