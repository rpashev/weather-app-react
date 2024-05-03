export type linkTitleType = 'Login' | 'Home' | 'Sign Up' | 'Logout' | 'Map' | 'Settings';
export type LanguageMapType = {
  linkTitles: {
    Login: string;
    Home: string;
    ['Sign Up']: string;
    Logout: string;
    Map: string;
    Settings: string;
  };
};
export const en: LanguageMapType = Object.freeze({
  linkTitles: {
    Login: 'Login',
    Home: 'Home',
    ['Sign Up']: 'Sign Up',
    Logout: 'Logout',
    Map: 'Map',
    Settings: 'Settings',
  },
});
