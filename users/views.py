from django.contrib import messages
from django.contrib.auth.views import LoginView, PasswordResetDoneView, PasswordResetView, PasswordResetConfirmView
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import HttpResponseRedirect, render, redirect
from django.urls import reverse, reverse_lazy
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView, UpdateView
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from django.db.models.query_utils import Q
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage, send_mail
from django.http import HttpResponse

from common.views import TitleMixin
from users.forms import UserLoginForm, UserProfileForm, UserRegistrationForm
from users.models import EmailVerification, User
from .tokens import account_activation_token


class UserLoginView(TitleMixin, LoginView):
    template_name = 'users/login.html'
    form_class = UserLoginForm
    title = 'KanbanPM - Авторизация'


class UserRegistrationView(TitleMixin, SuccessMessageMixin, CreateView):
    model = User
    form_class = UserRegistrationForm
    template_name = 'users/registration.html'
    success_url = reverse_lazy('users:login')
    success_message = 'Вы успешно зарегестрированы!'
    title = 'KanbanPM - Регистрация'


class UserProfileView(TitleMixin, UpdateView):
    model = User
    form_class = UserProfileForm
    template_name = 'users/profile.html'
    title = 'KanbanPM - Личный кабинет'

    def get_success_url(self):
        return reverse_lazy('users:profile', args=(self.object.id,))


class EmailVerificationView(TitleMixin, TemplateView):
    title = 'KanbanPM - подтвеждение электронной почты'
    template_name = 'users/email_verification.html'

    def get(self, request, *args, **kwargs):
        code = kwargs['code']
        user = User.objects.get(email=kwargs['email'])
        email_verifications = EmailVerification.objects.filter(user=user, code=code)
        if email_verifications.exists() and not email_verifications.first().is_expired():
            user.is_verified_email = True
            user.save()
            return super(EmailVerificationView, self).get(request, *args, **kwargs)
        else:
            return HttpResponseRedirect(reverse('index'))


class PassResetView(PasswordResetView):
    title = 'KanbanPM - Восстановление пароля'
    template_name = "users/password_reset_form.html"
    success_url = reverse_lazy('users:password_reset_done')


class PassDoneView(PasswordResetDoneView):
    title = 'KanbanPM - Восстановление пароля'
    template_name = 'users/password_reset_done.html'


class PassConfirmView(PasswordResetConfirmView):
    title = 'KanbanPM - Изменение пароля'
    template_name = 'users/password_reset_confirm.html'
    success_url = reverse_lazy('users:password_reset_complete')


def reset_password_message(request):
    if request.method == "POST":
        password_form = PasswordResetForm(request.POST)
        if password_form.is_valid():
            data = password_form.cleaned_data['email']
            user_email = User.objects.filter(Q(email=data))
            if user_email.exists():
                for user in user_email:
                    subject = 'Password Request'
                    email_template_name = 'users/password_message.txt'
                    parameters = {
                        'email': user.email,
                        'domain': '127.0.0.1:8000',
                        'temp': '/users/password-reset/confirm',
                        'site_name': 'KanbanPM',
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': default_token_generator.make_token(user),
                        'protocol': 'http'
                    }
                    email = render_to_string(email_template_name, parameters)
                    try:
                        send_mail(subject, email, '', [user.email], fail_silently=False)
                    except:
                        return HttpResponse('Invalid Header')
                    return redirect('users:password_reset_done')
    else:
        password_form = PasswordResetForm()
    context = {
        'form': password_form
    }
    return render(request, 'users/password_reset_form.html', context)
