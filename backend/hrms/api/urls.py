from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet

router = DefaultRouter()
router.register("employees", EmployeeViewSet, basename="employee")
router.register("attendance", AttendanceViewSet, basename="attendance")

urlpatterns = router.urls
