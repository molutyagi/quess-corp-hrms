from django.db import models
from django.core.validators import EmailValidator

class Employee(models.Model):

    """
    Represents a company employee.
    This is the core HR entity.
    """

    employee_id = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
        help_text="Business employee identifier"
    )

    full_name = models.CharField(
        max_length=200
    )

    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()]
    )

    department = models.CharField(
        max_length=100
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["employee_id"]

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"


class Attendance(models.Model):
    """
    Daily attendance record for an employee.
    """

    STATUS_PRESENT = "Present"
    STATUS_ABSENT = "Absent"

    STATUS_CHOICES = [
        (STATUS_PRESENT, "Present"),
        (STATUS_ABSENT, "Absent"),
    ]

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="attendance_records"
    )

    date = models.DateField()

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("employee", "date")
        ordering = ["-date"]

    def __str__(self):
        return f"{self.employee.employee_id} | {self.date} | {self.status}"
