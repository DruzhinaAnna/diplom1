from django import forms
from django.contrib.auth.forms import (AuthenticationForm, UserChangeForm,
                                       UserCreationForm)
from django.db import models

from users.models import User
from users.tasks import send_email_verification

temp = (('RU', "Россия"), ("US", "США"))


class Support(UserCreationForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите имя'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите фамилию'}))
    email = forms.CharField(widget=forms.EmailInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите адрес эл. почты'}))
    number = forms.CharField(widget=forms.NumberInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите номер телефона'}))

    country = forms.CharField(verbose_name='Страна', max_length=5, choices=temp)

    # passwords1 = forms.CharField(widget=forms.TextInput(attrs={
    #     'class': 'form-control py-4', 'placeholder': 'Выберите страну'}))

    discussion = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите номер телефона'}))
