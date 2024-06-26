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
from apps.contest.views import ContestViewSet, SubmissionViewSet
from apps.idea.views import IdeaViewSet, CommentViewSet
from apps.sponsor.views import SponsorEventViewSet, SponsorPackageViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework import permissions
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


router = routers.DefaultRouter()
router.register(r'', AccountViewSet, basename='account')
router.register(r'', IdeaViewSet, basename='idea')
router.register(r'', ContestViewSet, basename='contest')
router.register(r'', SponsorEventViewSet, basename='sponsor-event')
router.register(r'', SponsorPackageViewSet, basename='sponsor-package')
router.register(r'', EmailServiceViewSet, basename='email')
router.register(r'', CommentViewSet, basename='comment')
router.register(r'', SubmissionViewSet, basename='submission')

schema_view = get_schema_view(
    openapi.Info(
        title="Woridea API",
        default_version='v1',
        description="Description of Woridea API",
        terms_of_service="https://www.example.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path(r"files/", FileUploadApiView.as_view(), name="file"),
    path(r"requirements/", CompanyApiView.as_view(), name="requirement"),
    path(r"accounts/refresh/", TokenRefreshView.as_view(), name='token-refresh'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
