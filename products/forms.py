from django import forms
from django.contrib.auth.forms import (AuthenticationForm, UserChangeForm,
                                       UserCreationForm)
from django.db import models

from products.models import Support

temp = (('RU', "Россия"), ("US", "США"))


class Supporting(forms.ModelForm):
    first_name = forms.CharField(label="Имя", widget=forms.TextInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите имя'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите фамилию'}))
    email = forms.CharField(widget=forms.EmailInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите адрес эл. почты'}))
    number = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите номер телефона'}))
    discussion = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control py-4', 'placeholder': 'Введите номер телефона'}))

    # country = forms.CharField(verbose_name='Страна', max_length=5, choices=temp)

    # passwords1 = forms.CharField(widget=forms.TextInput(attrs={
    #     'class': 'form-control py-4', 'placeholder': 'Выберите страну'}))

    class Meta:
        model = Support
        fields = ('first_name', 'last_name', 'email', 'number', 'discussion')
