import django
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LogoutView, PasswordResetForm
from django.urls import path

from users.views import (EmailVerificationView, UserLoginView, UserProfileView,
                         UserRegistrationView)

app_name = 'users'

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='login'),
    path('registration/', UserRegistrationView.as_view(), name='registration'),
    path('profile/<int:pk>/', login_required(UserProfileView.as_view()), name='profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify/<str:email>/<uuid:code>/', EmailVerificationView.as_view(), name='email_verification'),

    url(r'^password-reset/$', django.contrib.auth.views.PasswordResetView.as_view(), name='password_reset'),
    url(r'^password-reset/done/$', django.contrib.auth.views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    url(r'^password-reset/confirm/(?P<uidb64>[-\w]+)/(?P<token>[-\w]+)/$', django.contrib.auth.views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^password-reset/complete/$', django.contrib.auth.views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
