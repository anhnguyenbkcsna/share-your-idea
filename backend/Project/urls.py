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
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from apps.company.views import CompanyApiView
from apps.file_service.views import FileUploadApiView
from apps.email_service.views import EmailServiceViewSet
from apps.account.views import AccountViewSet
from apps.contest.views import ContestViewSet
from apps.idea.views import IdeaViewSet
from apps.sponsor.views import SponsorEventViewSet, SponsorPackageViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.urls import path, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'', AccountViewSet, basename='account')
router.register(r'', IdeaViewSet, basename='idea')
router.register(r'', ContestViewSet, basename='contest')
router.register(r'', SponsorEventViewSet, basename='sponsor-event')
router.register(r'', SponsorPackageViewSet, basename='sponsor-package')
router.register(r'', EmailServiceViewSet, basename='email')

urlpatterns = [
    path(r"files/", FileUploadApiView.as_view(), name="file"),
    path(r"requirements/", CompanyApiView.as_view(), name="requirement"),
    path(r"accounts/refresh/", TokenRefreshView.as_view(), name='token-refresh'),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
