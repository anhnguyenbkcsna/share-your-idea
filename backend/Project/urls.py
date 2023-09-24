"""
URL configuration for Project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# from rest_framework import routers
from django.urls import path, include, re_path
from user.views import UserApiView
from idea.views import IdeaApiView
from poe_api.views import PoeApiView
from django.conf import settings
from django.conf.urls.static import static

# router = routers.SimpleRouter()
# router.register(r'users', UserViewSet)
# router.register(r'accounts', AccountViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/<str:id>/", UserApiView.as_view(), name="user"),
    path("idea/<str:id>/", IdeaApiView.as_view(), name="idea"),
    path("user/", UserApiView.as_view(), name="user"),
    path("poe/", PoeApiView.as_view(), name="poe-api"),
    path("idea/", IdeaApiView.as_view(), name="idea"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
