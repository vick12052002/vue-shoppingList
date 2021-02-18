import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './pages/HomePage';
import AddListPage from './pages/AddListPage';
import ListPage from './pages/ListPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: `/`,
      name: 'home',
      component: HomePage,
    },
    {
      path: '/addList',
      name: 'addList',
      component: AddListPage,
    },
    {
      path: '/list/:id',
      name: 'list',
      component: ListPage,
    },
    {
      path: `/*`,
      name: 'default',
      component: HomePage,
    },
  ],
});
