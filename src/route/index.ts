import ProductManagement from "../components/pages/admin/ProductManagement.vue";
import BrandManagement from "../components/pages/admin/UserManage.vue";
import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/pages/Home.vue";
import Dashboard from "../components/pages/admin/Dashboard.vue";

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/products', name: 'product', component: ProductManagement},
    {path: '/user', name: 'user', component: BrandManagement},
    {path: '/admin', name: 'dashboard', component: Dashboard},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
});

export default router;

