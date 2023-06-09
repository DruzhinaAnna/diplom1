from datetime import date

from django.db import models

from products.models import Basket
from users.models import User


class Order(models.Model):
    CREATED = 0
    PAID = 1
    ON_WAY = 2
    DELIVERED = 3
    STATUSES = (
        (CREATED, 'Создан'),
        (PAID, 'Оплачен'),
        (ON_WAY, 'В пути'),
        (DELIVERED, 'Доставлен'),
    )

    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(max_length=256)
    address = models.CharField(max_length=256)
    basket_history = models.JSONField(default=dict)
    created = models.DateTimeField(auto_now_add=True)
    status = models.SmallIntegerField(default=CREATED, choices=STATUSES)
    initiator = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def __str__(self):
        return f'Order #{self.id}. {self.first_name} {self.last_name}'

    def update_after_payment(self):
        baskets = Basket.objects.filter(user=self.initiator)
        self.status = self.PAID
        self.basket_history = {
            'purchased_items': [basket.de_json() for basket in baskets],
            'total_sum': float(baskets.total_sum()),
        }
        baskets.delete()
        self.save()


class Resume(models.Model):
    file = models.FileField(upload_to='files/', null=True)
    initiator = models.ForeignKey(to=User, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'files'
        verbose_name_plural = 'files'

    def __repr__(self):
        return 'Resume(%s)' % self.file

    # def __str__(self):
    #     return self.file


class Task(models.Model):
    NOT_COMPLETE = 0
    IN_PROGRESS = 1
    DONE = 2

    STATUSES = (
        (NOT_COMPLETE, 'Не завершено'),
        (IN_PROGRESS, 'В процессе'),
        (DONE, 'Готово'),
    )

    name = models.CharField(max_length=40)
    date = models.DateTimeField(auto_now_add=True)
    expired = models.DateTimeField()
    status = models.SmallIntegerField(default=NOT_COMPLETE, choices=STATUSES)
    description = models.CharField(max_length=256)
    initiator = models.ForeignKey(to=User, on_delete=models.CASCADE)
    file = models.ForeignKey(to=Resume, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'tasks'
        verbose_name_plural = 'tasks'

    def __str__(self):
        return self.name


@property
def is_past_due(self):
    return date.today() == self.date
