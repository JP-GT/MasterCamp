import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductList from '../components/ProductList.vue'
import LoginUser from '../views/LoginView.vue'
import RegisterUser from '../views/RegisterView.vue'
import Home2 from "@/views/Home2";
import UserList from '../components/UsersList.vue'
import SearchProduct from '../components/SearchProduct.vue'
import SearchUser from '../components/SearchUser.vue'

import Logout from '../components/Logout.vue'


const routes = [
    {
        path:"/Home2",
        name:'Home2',
        component: Home2
    },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/addProduct',
    name: 'add-product',
    component: AddProduct
  },

  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
      path: '/list',
      name: 'list-product',
      component: ProductList
  },
  {
      path: '/UsersList',
      name: 'UsersList',
      component: UserList
  },

  {
      path: '/login',
      name: 'login',
      component: LoginUser
  },
  {
      path: '/register',
      name: 'register',
      component: RegisterUser
  },
  {
    path: '/searchProduct',
    name: 'searchProduct',
    component: SearchProduct
},
{
    path: '/SearchUser',
    name: 'SearchUser',
    component: SearchUser
},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
