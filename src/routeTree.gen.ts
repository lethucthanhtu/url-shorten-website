/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UserlayoutImport } from './routes/_user_layout'
import { Route as MainlayoutImport } from './routes/_main_layout'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as MainlayoutIndexImport } from './routes/_main_layout/index'
import { Route as MainlayoutHomeImport } from './routes/_main_layout/home'
import { Route as MainlayoutContactImport } from './routes/_main_layout/contact'
import { Route as MainlayoutAboutImport } from './routes/_main_layout/about'
import { Route as Mainlayout404Import } from './routes/_main_layout/404'
import { Route as MainlayoutUserlayoutAloImport } from './routes/_main_layout/_user_layout/alo'
import { Route as UserlayoutUserUserIdIndexImport } from './routes/_user_layout/user/$userId/index'
import { Route as UserlayoutUserUserIdSettingImport } from './routes/_user_layout/user/$userId/setting'

// Create/Update Routes

const UserlayoutRoute = UserlayoutImport.update({
  id: '/_user_layout',
  getParentRoute: () => rootRoute,
} as any)

const MainlayoutRoute = MainlayoutImport.update({
  id: '/_main_layout',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationRoute = AuthenticationImport.update({
  id: '/_authentication',
  getParentRoute: () => rootRoute,
} as any)

const MainlayoutIndexRoute = MainlayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutHomeRoute = MainlayoutHomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutContactRoute = MainlayoutContactImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutAboutRoute = MainlayoutAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => MainlayoutRoute,
} as any)

const Mainlayout404Route = Mainlayout404Import.update({
  id: '/404',
  path: '/404',
  getParentRoute: () => MainlayoutRoute,
} as any)

const MainlayoutUserlayoutAloRoute = MainlayoutUserlayoutAloImport.update({
  id: '/_user_layout/alo',
  path: '/alo',
  getParentRoute: () => MainlayoutRoute,
} as any)

const UserlayoutUserUserIdIndexRoute = UserlayoutUserUserIdIndexImport.update({
  id: '/user/$userId/',
  path: '/user/$userId/',
  getParentRoute: () => UserlayoutRoute,
} as any)

const UserlayoutUserUserIdSettingRoute =
  UserlayoutUserUserIdSettingImport.update({
    id: '/user/$userId/setting',
    path: '/user/$userId/setting',
    getParentRoute: () => UserlayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authentication': {
      id: '/_authentication'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_main_layout': {
      id: '/_main_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainlayoutImport
      parentRoute: typeof rootRoute
    }
    '/_user_layout': {
      id: '/_user_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UserlayoutImport
      parentRoute: typeof rootRoute
    }
    '/_main_layout/404': {
      id: '/_main_layout/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof Mainlayout404Import
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/about': {
      id: '/_main_layout/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof MainlayoutAboutImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/contact': {
      id: '/_main_layout/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof MainlayoutContactImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/home': {
      id: '/_main_layout/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof MainlayoutHomeImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/': {
      id: '/_main_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainlayoutIndexImport
      parentRoute: typeof MainlayoutImport
    }
    '/_main_layout/_user_layout/alo': {
      id: '/_main_layout/_user_layout/alo'
      path: '/alo'
      fullPath: '/alo'
      preLoaderRoute: typeof MainlayoutUserlayoutAloImport
      parentRoute: typeof MainlayoutImport
    }
    '/_user_layout/user/$userId/setting': {
      id: '/_user_layout/user/$userId/setting'
      path: '/user/$userId/setting'
      fullPath: '/user/$userId/setting'
      preLoaderRoute: typeof UserlayoutUserUserIdSettingImport
      parentRoute: typeof UserlayoutImport
    }
    '/_user_layout/user/$userId/': {
      id: '/_user_layout/user/$userId/'
      path: '/user/$userId'
      fullPath: '/user/$userId'
      preLoaderRoute: typeof UserlayoutUserUserIdIndexImport
      parentRoute: typeof UserlayoutImport
    }
  }
}

// Create and export the route tree

interface MainlayoutRouteChildren {
  Mainlayout404Route: typeof Mainlayout404Route
  MainlayoutAboutRoute: typeof MainlayoutAboutRoute
  MainlayoutContactRoute: typeof MainlayoutContactRoute
  MainlayoutHomeRoute: typeof MainlayoutHomeRoute
  MainlayoutIndexRoute: typeof MainlayoutIndexRoute
  MainlayoutUserlayoutAloRoute: typeof MainlayoutUserlayoutAloRoute
}

const MainlayoutRouteChildren: MainlayoutRouteChildren = {
  Mainlayout404Route: Mainlayout404Route,
  MainlayoutAboutRoute: MainlayoutAboutRoute,
  MainlayoutContactRoute: MainlayoutContactRoute,
  MainlayoutHomeRoute: MainlayoutHomeRoute,
  MainlayoutIndexRoute: MainlayoutIndexRoute,
  MainlayoutUserlayoutAloRoute: MainlayoutUserlayoutAloRoute,
}

const MainlayoutRouteWithChildren = MainlayoutRoute._addFileChildren(
  MainlayoutRouteChildren,
)

interface UserlayoutRouteChildren {
  UserlayoutUserUserIdSettingRoute: typeof UserlayoutUserUserIdSettingRoute
  UserlayoutUserUserIdIndexRoute: typeof UserlayoutUserUserIdIndexRoute
}

const UserlayoutRouteChildren: UserlayoutRouteChildren = {
  UserlayoutUserUserIdSettingRoute: UserlayoutUserUserIdSettingRoute,
  UserlayoutUserUserIdIndexRoute: UserlayoutUserUserIdIndexRoute,
}

const UserlayoutRouteWithChildren = UserlayoutRoute._addFileChildren(
  UserlayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof UserlayoutRouteWithChildren
  '/404': typeof Mainlayout404Route
  '/about': typeof MainlayoutAboutRoute
  '/contact': typeof MainlayoutContactRoute
  '/home': typeof MainlayoutHomeRoute
  '/': typeof MainlayoutIndexRoute
  '/alo': typeof MainlayoutUserlayoutAloRoute
  '/user/$userId/setting': typeof UserlayoutUserUserIdSettingRoute
  '/user/$userId': typeof UserlayoutUserUserIdIndexRoute
}

export interface FileRoutesByTo {
  '': typeof UserlayoutRouteWithChildren
  '/404': typeof Mainlayout404Route
  '/about': typeof MainlayoutAboutRoute
  '/contact': typeof MainlayoutContactRoute
  '/home': typeof MainlayoutHomeRoute
  '/': typeof MainlayoutIndexRoute
  '/alo': typeof MainlayoutUserlayoutAloRoute
  '/user/$userId/setting': typeof UserlayoutUserUserIdSettingRoute
  '/user/$userId': typeof UserlayoutUserUserIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authentication': typeof AuthenticationRoute
  '/_main_layout': typeof MainlayoutRouteWithChildren
  '/_user_layout': typeof UserlayoutRouteWithChildren
  '/_main_layout/404': typeof Mainlayout404Route
  '/_main_layout/about': typeof MainlayoutAboutRoute
  '/_main_layout/contact': typeof MainlayoutContactRoute
  '/_main_layout/home': typeof MainlayoutHomeRoute
  '/_main_layout/': typeof MainlayoutIndexRoute
  '/_main_layout/_user_layout/alo': typeof MainlayoutUserlayoutAloRoute
  '/_user_layout/user/$userId/setting': typeof UserlayoutUserUserIdSettingRoute
  '/_user_layout/user/$userId/': typeof UserlayoutUserUserIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/404'
    | '/about'
    | '/contact'
    | '/home'
    | '/'
    | '/alo'
    | '/user/$userId/setting'
    | '/user/$userId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/404'
    | '/about'
    | '/contact'
    | '/home'
    | '/'
    | '/alo'
    | '/user/$userId/setting'
    | '/user/$userId'
  id:
    | '__root__'
    | '/_authentication'
    | '/_main_layout'
    | '/_user_layout'
    | '/_main_layout/404'
    | '/_main_layout/about'
    | '/_main_layout/contact'
    | '/_main_layout/home'
    | '/_main_layout/'
    | '/_main_layout/_user_layout/alo'
    | '/_user_layout/user/$userId/setting'
    | '/_user_layout/user/$userId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticationRoute: typeof AuthenticationRoute
  MainlayoutRoute: typeof MainlayoutRouteWithChildren
  UserlayoutRoute: typeof UserlayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticationRoute: AuthenticationRoute,
  MainlayoutRoute: MainlayoutRouteWithChildren,
  UserlayoutRoute: UserlayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authentication",
        "/_main_layout",
        "/_user_layout"
      ]
    },
    "/_authentication": {
      "filePath": "_authentication.tsx"
    },
    "/_main_layout": {
      "filePath": "_main_layout.tsx",
      "children": [
        "/_main_layout/404",
        "/_main_layout/about",
        "/_main_layout/contact",
        "/_main_layout/home",
        "/_main_layout/",
        "/_main_layout/_user_layout/alo"
      ]
    },
    "/_user_layout": {
      "filePath": "_user_layout.tsx",
      "children": [
        "/_user_layout/user/$userId/setting",
        "/_user_layout/user/$userId/"
      ]
    },
    "/_main_layout/404": {
      "filePath": "_main_layout/404.tsx",
      "parent": "/_main_layout"
    },
    "/_main_layout/about": {
      "filePath": "_main_layout/about.tsx",
      "parent": "/_main_layout"
    },
    "/_main_layout/contact": {
      "filePath": "_main_layout/contact.tsx",
      "parent": "/_main_layout"
    },
    "/_main_layout/home": {
      "filePath": "_main_layout/home.tsx",
      "parent": "/_main_layout"
    },
    "/_main_layout/": {
      "filePath": "_main_layout/index.tsx",
      "parent": "/_main_layout"
    },
    "/_main_layout/_user_layout/alo": {
      "filePath": "_main_layout/_user_layout/alo.tsx",
      "parent": "/_main_layout"
    },
    "/_user_layout/user/$userId/setting": {
      "filePath": "_user_layout/user/$userId/setting.tsx",
      "parent": "/_user_layout"
    },
    "/_user_layout/user/$userId/": {
      "filePath": "_user_layout/user/$userId/index.tsx",
      "parent": "/_user_layout"
    }
  }
}
ROUTE_MANIFEST_END */
