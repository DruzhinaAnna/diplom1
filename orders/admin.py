from django.contrib import admin

from orders.models import Order, Task, Resume


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
    list_display = ('__str__', 'status')
    fields = (
        'date',
        ('name', 'initiator'),
        'status', 'expired', 'description', 'file'
    )
    readonly_fields = ('date',)


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('initiator',)
    fields = (
        'file', 'initiator'
    )
    # readonly_fields = ('file',)
