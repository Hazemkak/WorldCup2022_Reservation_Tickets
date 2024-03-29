from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.authentication.urls')),
    path('api/', include('apps.users.urls')),
    path('api/', include('apps.teams.urls')),
    path('api/', include('apps.matches.urls')),
    path('api/', include('apps.referees.urls')),
    path('api/', include('apps.stadiums.urls')),
    path('api/', include('apps.reservations.urls')),
]
