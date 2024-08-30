const ROUTES = {
  PAGE_CHAT: '/',
  PAGE_LOGIN: '/login',
  PAGE_SIGNUP: '/signup',
  PAGE_NOT_FOUND: '*',
};

const getRoute = (key) => ROUTES[key];

export default getRoute;
