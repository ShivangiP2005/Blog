export const router = {
  routes: new Map(),
  
  addRoute(path, view) {
    this.routes.set(path, view);
  },

  async navigate(url) {
    const matchedRoute = Array.from(this.routes.entries())
      .find(([route]) => {
        // Convert route pattern to regex
        const pattern = route.replace(/:(\w+)/g, '([^/]+)');
        return new RegExp(`^${pattern}$`).test(url);
      });

    if (matchedRoute) {
      const [route, view] = matchedRoute;
      const params = this.extractParams(route, url);
      const content = await view(params);
      document.querySelector('#app').innerHTML = content;
    } else {
      document.querySelector('#app').innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  },

  extractParams(route, url) {
    const paramNames = (route.match(/:\w+/g) || []).map(param => param.slice(1));
    const paramValues = url.match(new RegExp(route.replace(/:\w+/g, '([^/]+)')));
    
    if (!paramValues) return {};
    
    return paramNames.reduce((params, name, i) => {
      params[name] = paramValues[i + 1];
      return params;
    }, {});
  }
};