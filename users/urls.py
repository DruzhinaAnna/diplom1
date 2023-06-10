import django
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LogoutView, PasswordResetConfirmView
from django.urls import path

from users.views import (EmailVerificationView, UserLoginView, UserProfileView,
                         UserRegistrationView, PassResetView, PassDoneView,
                         PassConfirmView, reset_password_message)

app_name = 'users'

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='login'),
    path('registration/', UserRegistrationView.as_view(), name='registration'),
    path('profile/<int:pk>/', login_required(UserProfileView.as_view()), name='profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify/<str:email>/<uuid:code>/', EmailVerificationView.as_view(), name='email_verification'),

    url(r'^password-reset/$', reset_password_message, name='password_reset'),
    url(r'^password-reset/done/$', PassDoneView.as_view(), name='password_reset_done'),
    # url(r'^password-reset/confirm/(?P<uidb64>[-\w]+)/(?P<token>[-\w]+)/$', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^password-reset/complete/$', django.contrib.auth.views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
