import { reloadAuthorized } from './Authorized';
import pathRegexp from 'path-to-regexp';
import { Route } from '@/models/connect';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}
export const getAuthorityCurrentRoute = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined =>{
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>{
      // (path && target !== '_blank' && pathRegexp(path).exec(pathname))  || (routes && getAuthorityCurrentRoute(routes, pathname)) 
      return (path && target !== '_blank' && pathRegexp(path).exec(pathname)) 
      || (routes && getAuthorityCurrentRoute(routes, pathname)) 
    } 
  );

  if (authority){
    return authority
  }else{
    return undefined;
  }
}
export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    console.log(route.authority)
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  console.log(authorities)
  return authorities;
};


