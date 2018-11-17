import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.jsx').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.jsx').default
      },
      {
        "path": "/rocket",
        "exact": true,
        "component": require('../rocket/index.jsx').default
      },
      {
        "component": () => React.createElement(require('/Users/jilin/projects/my/rocket/node_modules/_umi-build-dev@1.2.6@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/jilin/projects/my/rocket/node_modules/_umi-build-dev@1.2.6@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
