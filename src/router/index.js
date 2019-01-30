import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/views/Products.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import AddProduct from '@/views/AddProduct.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Products',
      component: Products
    },
    {
      path: '/details',
      name: 'ProductDetails',
      component: ProductDetails
    },
    {
      path: '/add',
      name: 'AddProduct',
      component: AddProduct
    },
  ]
})
