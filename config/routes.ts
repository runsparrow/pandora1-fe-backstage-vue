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
            component: './user/login',
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
            name: 'material',
            icon: 'DisconnectOutlined',
            path: '/material',
            component: './material/index',
          },
          {
            name: 'review',
            icon: 'ReconciliationOutlined',
            path: '/review',
            component: './review/index',
          },
          {
            name: 'down',
            icon: 'table',
            path: '/down',
            component: './down/index',
          },
          {
            name: 'users',
            icon: 'table',
            path: '/users',
            component: './users/index',
          },
          {
            name: 'member',
            icon: 'table',
            path: '/member',
            component: './member/index',
          },
          {
            name: 'memberpower',
            icon: 'table',
            path: '/memberpower',
            component: './memberPower/index',
          },
          {
            name: 'recharge',
            icon: 'OrderedListOutlined',
            path: '/recharge',
            component: './recharge/index',
          },
          {
            name: 'serial',
            icon: 'table',
            path: '/serial',
            component: './serial/index',
          },
          {
            name: 'card',
            icon: 'table',
            path: '/card',
            component: './card/index',
          },
          {
            name: 'hospital',
            icon: 'BookOutlined',
            path: '/hospital',
            component: './hospital/index',
          },
          {
            name: 'dictionary',
            icon: 'BookOutlined',
            path: '/dictionary',
            component: './dictionary/index',
          },
          {
            name: 'goodsClassify',
            icon: 'table',
            path: '/goodsClassify',
            component: './goodsClassify/index',
          },
          {
            name: 'navigation',
            icon: 'MenuOutlined',
            path: '/navigation',
            component: './navigation/index',
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