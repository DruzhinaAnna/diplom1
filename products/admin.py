from django.contrib import admin

from products.models import Basket, Product, ProductCategory, Support

admin.site.register(ProductCategory)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity', 'category')
    fields = ('image', 'name', 'description', ('price', 'quantity'), 'stripe_product_price_id', 'category')
    readonly_fields = ('description',)
    search_fields = ('name',)
    ordering = ('-name',)


@admin.register(Support)
class SupportAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'number')
    fields = ('first_name', 'last_name', 'email', 'number', 'discussion')
    readonly_fields = ('first_name', 'last_name', 'email', 'number', 'discussion')
    search_fields = ('email',)
    ordering = ('-first_name',)


class BasketAdmin(admin.TabularInline):
    model = Basket
    fields = ('product', 'quantity', 'created_timestamp')
    readonly_fields = ('created_timestamp',)
    extra = 0
