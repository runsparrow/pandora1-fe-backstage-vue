import { parse } from 'querystring';
import provinceCity from '@utils/city'

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);


export const gettreelist = (item = []) => {
  // title key children
  let newtreelist = []
  for (let i of item) {
    newtreelist.push({ title: i.title, key: i.id, children: gettreelist(i.children), row: i.row })
  }
  return newtreelist
}

export const hospitaltree = (item = []) => {
  let newtreelist = []
  for (let i of item) {
    newtreelist.push({ ...i, title: i.name, key: i.id, isLeaf: !i.isLeaf })
  }
  return newtreelist
}

export const getAreaName = (code) => {
  let name = ""
  function getName(data) {
    for (let i of data) {
      if (i.value == code) {
        return i.label
      } else {
        if (i.children) {
          getName(i.children)
        }
      }
    }
  }
  name = getName(provinceCity)
  return name
}
