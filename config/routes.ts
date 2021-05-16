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
          // {
          //   name: 'goods',
          //   icon: 'table',
          //   path: '/goods',
          //   component: './goods/index',
          // },
          {
            name: 'order',
            icon: 'OrderedListOutlined',
            path: '/order',
            component: './order/index',
          },
          // {
          //   name: "article",
          //   icon: 'MessageOutlined',
          //   path: '/article',
          //   routes: [
          //     {
          //       path: '/',
          //       redirect: '/article/index',
          //     },
          //     {
          //       name: 'my-article',
          //       path: '/article/index',
          //       component: './article/index',
          //     },
          //     {
          //       name: 'new-article',
          //       icon: 'table',
          //       path: '/article/new',
          //       hideInMenu: true,
          //       component: './article/newArticle',
          //     },
          //     {
          //       name: 'edit-article',
          //       icon: 'table',
          //       path: '/article/edit',
          //       hideInMenu: true,
          //       component: './article/newArticle',
          //     }
          //   ]
          // },
          {
            name: 'dictionary',
            icon: 'BookOutlined',
            path: '/dictionary',
            component: './dictionary/index',
          },
          {
            name: 'material',
            icon: 'DisconnectOutlined',
            path: '/material',
            component: './material/index',
          },
          {
            name: 'navigation',
            icon: 'MenuOutlined',
            path: '/navigation',
            component: './navigation/index',
          },
          {
            name: 'review',
            icon: 'ReconciliationOutlined',
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
            name: 'status',
            icon: 'table',
            path: '/status',
            component: './status/index',
          },
          {
            name: 'users',
            icon: 'table',
            path: '/users',
            component: './users/index',
          },
          {
            name: 'goodsClassify',
            icon: 'table',
            path: '/goodsClassify',
            component: './goodsClassify/index',
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
]