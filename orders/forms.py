from datetime import datetime

from django import forms

from orders.models import Order, Resume, Task
from datetime import date


class OrderForm(forms.ModelForm):
    first_name = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Иван'}))
    last_name = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Иванов'}))
    email = forms.EmailField(widget=forms.EmailInput(
        attrs={'class': 'form-control', 'placeholder': 'you@example.com'}))
    address = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control',
               'placeholder': 'Россия, Москва, ул. Мира, дом 6',
               }))

    class Meta:
        model = Order
        fields = ('first_name', 'last_name', 'email', 'address')


# class TaskForm(forms.ModelForm):
#     name = forms.CharField(widget=forms.TextInput(
#         attrs={'class': 'form-control', 'placeholder': 'Введите название'}))
#     date = forms.DateTimeField(widget=forms.DateTimeInput(
#         attrs={'class': 'form-control', 'placeholder': '2'}))
#     expired = forms.DateTimeField(widget=forms.DateTimeInput(
#         attrs={'class': 'form-control', 'placeholder': '01.01.1900'}))
#     status = forms.MultipleChoiceField(widget=forms.MultipleHiddenInput())
#     description = forms.CharField(widget=forms.TextInput(
#         attrs={'class': 'form-control', 'placeholder': 'Введите описание'}))
#     # initiator = forms.CharField(widget=)

    # class Meta:
    #     model = Task
    #     fields = ['name', 'date', 'expired', 'status', 'description']
    #     # labels = {
    #     #     'title': 'Название Модели',
    #     #     'material': 'Материал',
    #     #     'priority': 'Приоритет сортировки',
    #     #     'is_active': 'Активна (включена)',
    #     # }


class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['file']
