from hrms.models import Attendance

def get_attendance_by_id(pk):
    return Attendance.objects.get(pk=pk)

def get_attendance_by_date_range(*, employee_id, start_date=None, end_date=None):
    queryset = Attendance.objects.filter(employee_id=employee_id)
    
    if start_date:
        queryset = queryset.filter(date__gte=start_date)
    if end_date:
        queryset = queryset.filter(date__lte=end_date)
        
    return queryset.order_by('-date')