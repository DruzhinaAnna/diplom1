from django.urls import path

from orders.views import (CanceledTemplateView, OrderCreateView,
                          OrderDetailView, OrderListView, SuccessTemplateView, main, mytasks, board, upload,
                          calender, anna)

app_name = 'orders'

urlpatterns = [
    path('order-create/', OrderCreateView.as_view(), name='order_create'),
    path('', OrderListView.as_view(), name='orders_list'),
    path('order/<int:pk>/', OrderDetailView.as_view(), name='order'),
    path('order-success/',
         SuccessTemplateView.as_view(),
         name='order_success'),
    path('order-canceled/',
         CanceledTemplateView.as_view(),
         name='order_canceled'),

    path('main/', main, name="main"),
    path('my-tasks/', mytasks, name="my-tasks"),
    path('board', board, name="board"),
    path('upload/', upload, name="upload"),
    path('calender', calender, name="calender"),
    # path('add-task/', AddTask.as_view(), name='add-task')

    path('anna/', anna, name="anna")
]
