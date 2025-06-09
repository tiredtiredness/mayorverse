import Cookies from 'js-cookie';

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken');
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set('accessToken', accessToken, {
    domain: process.env.CLIENT_DOMAIN,
    sameSite: 'None',
    secure: true,
    expires: 1,
  });
};


export const removeFromStorage = () => {
  Cookies.remove('accessToken');
};
