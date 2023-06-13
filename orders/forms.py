from django import forms

from orders.models import Order, Resume, Task


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


class TaskForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Введите название задачи'}))
    # date = forms.DateTimeField(widget=forms.DateTimeInput(
    #     attrs={'class': 'form-control', 'placeholder': '2'}))
    expired = forms.DateTimeField(widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': '01.01.1900'}))
    status = forms.IntegerField(widget=forms.HiddenInput(), initial=0)
    description = forms.CharField(widget=forms.Textarea(
        attrs={'class': 'form-control', 'placeholder': 'Введите описание',
               'rows': 1}))
    initiator = forms.CharField(widget=forms.HiddenInput(), initial=1)

    class Meta:
        model = Task
        fields = ['name', 'expired', 'status', 'description']
        # labels = {
        #     'title': 'Название Модели',
        #     'material': 'Материал',
        #     'priority': 'Приоритет сортировки',
        #     'is_active': 'Активна (включена)',
        # }


class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['file']
