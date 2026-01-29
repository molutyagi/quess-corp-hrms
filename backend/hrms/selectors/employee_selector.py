from hrms.models import Employee

def get_all_employees():
    return Employee.objects.all()

def get_employee_by_id(pk):
    return Employee.objects.get(pk=pk)