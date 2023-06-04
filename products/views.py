from django.contrib.auth.decorators import login_required
from django.shortcuts import HttpResponseRedirect, render
from django.views.generic.base import TemplateView
from django.views.generic.list import ListView

from common.views import TitleMixin
from products.models import Basket, Product, Support, ProductCategory
from products.forms import Supporting


class IndexView(TitleMixin, TemplateView):
    template_name = 'products/index.html'
    title = 'KanbanPM'


class ProductsListView(TitleMixin, ListView):
    model = Product
    template_name = 'products/products.html'
    paginate_by = 3
    title = 'KanbanPM'

    def get_queryset(self):
        queryset = super(ProductsListView, self).get_queryset()
        category_id = self.kwargs.get('category_id')
        return queryset.filter(category_id=category_id) if category_id else queryset

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(ProductsListView, self).get_context_data()
        context['categories'] = ProductCategory.objects.all()
        return context


class SupportListView(TitleMixin, ListView):
    model = Support
    form = Supporting
    template_name = 'products/products.html'
    paginate_by = 3
    title = 'KanbanPM - Техническая поддержка'

    # def get_queryset(self):
    #     queryset = super(SupportListView, self).get_queryset()
    #     category_id = self.kwargs.get('category_id')
    #     return queryset.filter(category_id=category_id) if category_id else queryset

    # def get_context_data(self, *, object_list=None, **kwargs):
    #     context = super(SupportListView, self).get_context_data()
    #     context['categories'] = ProductCategory.objects.all()
    #     return context


def support_function(request):
    form = Supporting()
    return render(request, 'products/products.html', {'form': form})


@login_required
def basket_add(request, product_id):
    product = Product.objects.get(id=product_id)
    baskets = Basket.objects.filter(user=request.user, product=product)

    if not baskets.exists():
        Basket.objects.create(user=request.user, product=product, quantity=1)
    else:
        basket = baskets.first()
        basket.quantity += 1
        basket.save()

    return HttpResponseRedirect(request.META['HTTP_REFERER'])


@login_required
def basket_remove(request, basket_id):
    basket = Basket.objects.get(id=basket_id)
    basket.delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])
