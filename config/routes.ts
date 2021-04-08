export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user/login',
            name: 'login',
            component: './User/login',
          },
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            name: 'register-result',
            icon: 'smile',
            path: '/user/register-result',
            component: './user/register-result',
          },
          {
            name: 'register',
            icon: 'smile',
            path: '/user/register',
            component: './user/register',
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            name: 'goods',
            icon: 'table',
            path: '/goods',
            component: './goods/index',
          },
          {
            name: 'order',
            icon: 'table',
            path: '/order',
            component: './order/index',
          },
          {
            name: 'article',
            icon: 'table',
            path: '/article',
            component: './article/index',
          },
          {
            name: 'dictionary',
            icon: 'table',
            path: '/dictionary',
            component: './dictionary/index',
          },
          {
            name: 'material',
            icon: 'table',
            path: '/material',
            component: './material/index',
          },
          {
            name: 'navigation',
            icon: 'table',
            path: '/navigation',
            component: './navigation/index',
          },
          {
            name: 'review',
            icon: 'table',
            path: '/review',
            component: './review/index',
          },
          {
            name: 'serial',
            icon: 'table',
            path: '/serial',
            component: './serial/index',
          },
          {
            name: 'status',
            icon: 'table',
            path: '/status',
            component: './status/index',
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
]