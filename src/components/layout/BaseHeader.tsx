// REACT
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/user-context';
import { NavLink } from 'react-router-dom';
// COMPONENTS
import { ThemeToggle } from '../UI/ThemeToggle';
import { WeatherLocalWidget } from '../WeatherLocalWidget';
// TYPES
import { type BaseWeatherResponseData } from '../../schemas/BaseWeatherSchema';

type BaseHeaderProps = {
  localCityData: BaseWeatherResponseData | null;
};

export const BaseHeader = ({ localCityData }: BaseHeaderProps) => {
  type Link = {
    title: string;
    path: string;
    id: number;
  };

  type Links = {
    public: Link[];
    user: Link[];
  };

  const navItems: Links = {
    public: [
      { title: 'Home', path: '/', id: 1 },
      { title: 'Weather Map', path: '/weather-map', id: 2 },
      { title: 'Login', path: '/login', id: 3 },
      { title: 'Sign Up', path: '/register', id: 4 },
    ],
    user: [
      { title: 'Home', path: '/', id: 5 },
      { title: 'Weather Map', path: '/weather-map', id: 6 },
      { title: 'Profile', path: '/profile', id: 7 },
      { title: 'Logout', path: '/logout', id: 8 },
    ],
  };

  const { isLoggedIn } = useAuth();
  const navLinks = isLoggedIn ? navItems.user : navItems.public;

  const [themeChanged, setThemeChanged] = useState(false);

  const theme = useMemo(() => {
    return localStorage.getItem('color-theme');
  }, [themeChanged]);

  const toggleTheme = () => {
    setThemeChanged((prev) => !prev);
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  };

  useEffect(() => {
    if (!theme || theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, []);

  return (
    <header className="flex w-full relative justify-center dark:bg-slate-800 bg-amber-400">
      {localCityData && <WeatherLocalWidget localCityData={localCityData} />}
      <nav className="grid w-full grid-cols-3 p-4">
        <ul className="col-start-2 flex justify-center gap-6 text-slate-100">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="rounded px-3 py-1 transition-all hover:bg-amber-300 hover:dark:bg-slate-600 has-[.active]:bg-amber-300 dark:has-[.active]:bg-slate-600 text-slate-800 dark:text-slate-100"
            >
              <NavLink to={link.path} className="inline-block text-xl leading-normal">
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="col-start-3 ml-auto text-slate-100">
          <ThemeToggle onThemeChanged={toggleTheme} isDarkMode={theme === 'dark'} />
        </div>
      </nav>
    </header>
  );
};
