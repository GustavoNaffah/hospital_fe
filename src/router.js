import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import ConsultPer from'./components/ConsultPer.vue'
import SignUp2 from'./components/SignUp2'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/logIn',
    name: 'logIn',
    component: LogIn
  },
  {
    path: '/user/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/user/home',
    name: 'home',
    component: Home
  },
  {
    path: '/user/consultPer',
    name: 'consultPer',
    component: ConsultPer
  },
  {
    path: '/user/signUp2',
    name: 'signUp2',
    component: SignUp2
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
