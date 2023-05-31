from datetime import date
from http import HTTPStatus

import stripe
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.messages.views import SuccessMessageMixin
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView

from common.views import TitleMixin
from orders.forms import OrderForm, ResumeForm
from orders.models import Order, Task, Resume
from products.models import Basket

from .forms import ResumeForm

stripe.api_key = settings.STRIPE_SECRET_KEY


class SuccessTemplateView(TitleMixin, TemplateView):
    template_name = 'orders/success.html'
    title = 'Store - Спасибо за заказ!'


class CanceledTemplateView(TemplateView):
    template_name = 'orders/cancled.html'


class OrderListView(TitleMixin, ListView):
    template_name = 'orders/orders.html'
    title = 'Store - Заказы'
    queryset = Order.objects.all()
    ordering = ('-created')

    def get_queryset(self):
        queryset = super(OrderListView, self).get_queryset()
        return queryset.filter(initiator=self.request.user)


class OrderDetailView(DetailView):
    template_name = 'orders/order.html'
    model = Order

    def get_context_data(self, **kwargs):
        context = super(OrderDetailView, self).get_context_data(**kwargs)
        context['title'] = f'Store - Заказ #{self.object.id}'
        return context


class OrderCreateView(TitleMixin, CreateView):
    template_name = 'orders/order-create.html'
    form_class = OrderForm
    success_url = reverse_lazy('orders:order_create')
    title = 'Store - Оформление заказа'

    def post(self, request, *args, **kwargs):
        super(OrderCreateView, self).post(request, *args, **kwargs)
        baskets = Basket.objects.filter(user=self.request.user)
        checkout_session = stripe.checkout.Session.create(
            line_items=baskets.stripe_products(),
            metadata={'order_id': self.object.id},
            mode='payment',
            success_url='{}{}'.format(settings.DOMAIN_NAME,
                                      reverse('orders:order_success')),
            cancel_url='{}{}'.format(settings.DOMAIN_NAME,
                                     reverse('orders:order_canceled')),
        )
        return HttpResponseRedirect(checkout_session.url,
                                    status=HTTPStatus.SEE_OTHER)

    def form_valid(self, form):
        form.instance.initiator = self.request.user
        return super(OrderCreateView, self).form_valid(form)


@csrf_exempt
def stripe_webhook_view(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        # Fulfill the purchase...
        fulfill_order(session)

    # Passed signature verification
    return HttpResponse(status=200)


def fulfill_order(session):
    order_id = int(session.metadata.order_id)
    order = Order.objects.get(id=order_id)
    order.update_after_payment()


@login_required
def main(request):
    context = {
        'tasks': Task.objects.filter(initiator=request.user),
    }
    return render(request, 'orders/main.html', context)


@login_required
def mytasks(request):
    context = {
        'tasks': Task.objects.filter(initiator=request.user)
    }
    return render(request, 'orders/my-tasks.html', context)


@login_required
def board(request):
    context = {
        'tasks': Task.objects.filter(initiator=request.user)
    }
    return render(request, 'orders/board.html', context)


def saving(request):
    if request.method == "POST":
        task = Task()
        task.name = request.POST.get("name")
        task.date = request.POST.get("date")
        task.expired = request.POST.get("expired")
        task.status = request.POST.get("status")
        task.description = request.POST.get("description")
        task.initiator = request.POST.get("initiator")
        task.save()
    return HttpResponseRedirect("/")


def handle_uploaded_file(f):
    with open('test.txt', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)


def upload(request):
    if request.method == 'POST':
        form = ResumeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/")
    else:
        form = ResumeForm
        context = {
            'form': form
        }
    return render(request, 'orders/upload.html', context)


def upload_file(request):
    if request.method == "POST":
        form = ResumeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("orders/board/")
    else:
        form = ResumeForm()
    return render(request, "orders/upload.html", {"form": form})


def calender(request):
    return render(request, 'orders/calender.html')


# class AddTask(TitleMixin, SuccessMessageMixin, CreateView):
#     model = Task
#     form_class = TaskForm
#     template_name = 'orders/add-task.html'
#     success_url = reverse_lazy('users:login')
#     success_message = 'Задача успешно добавлена!'
#     title = 'KanbanPM - Добавление задачи'


def anna(request):
    return render(request, 'orders/Anna.html')
