from django.urls import path, include
from knox import views as knox_views
from .views import *
from . import views

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name="register"),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('password_reset/confirm/',include('django_rest_passwordreset.urls', namespace='password_confirm')),
    path('get/', views.snippet_list, name='get'),
    path('PutDeletePatch/<int:pk>', views.snippet_detail, name='PutDeletePatch'),
    path('uploads/', UploadViewSet.as_view({'get': 'list', 'post': 'create'}), name='upload-list'),
    path('uploads/<int:pk>/', UploadViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='upload-detail'),
    path('shared-uploads/', SharedUploadViewSet.as_view({'get': 'list', 'post': 'create'}), name='shared-upload-list'),
    path('shared-uploads/<int:pk>/', SharedUploadViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='shared-upload-detail'),

]
