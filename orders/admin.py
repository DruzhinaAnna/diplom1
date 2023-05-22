from django.contrib import admin

from orders.models import Order, Task


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'status')
    fields = (
        'id', 'created',
        ('first_name', 'last_name'),
        ('email', 'address'),
        'basket_history', 'status', 'initiator',
    )
    readonly_fields = ('id', 'created')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'name')
    fields = (
        'date',
        ('name', 'owner'),
        'expired', 'description',
    )
    # readonly_fields = ('id', 'date')
