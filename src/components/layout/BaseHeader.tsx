// REACT
import { useState } from 'react';
import { useAuthContext } from '../../context/user-context';
import { NavLink } from 'react-router-dom';
// COMPONENTS
import { ThemeToggle } from '../UI/ThemeToggle';
import { WeatherLocalWidget } from '../WeatherLocalWidget';
import { MobileNavigation } from './MobileNavigation';

// TYPES
import { type BaseWeatherResponseData } from '../../schemas/BaseWeatherSchema';
import { useSettingsContext } from '../../context/settings-context';
import { linkTitleType } from '../../common/languages/en';

type BaseHeaderProps = {
  localCityData: BaseWeatherResponseData | null;
};

type Link = {
  title: linkTitleType;
  path: string;
  id: number;
};

type Links = {
  public: Link[];
  user: Link[];
};

export const navItems: Links = {
  public: [
    { title: 'Home', path: '/', id: 1 },
    { title: 'Map', path: '/weather-map', id: 2 },
    { title: 'Login', path: '/login', id: 3 },
    { title: 'Sign Up', path: '/register', id: 4 },
  ],
  user: [
    { title: 'Home', path: '/', id: 5 },
    { title: 'Map', path: '/weather-map', id: 6 },
    { title: 'Settings', path: '/settings', id: 7 },
    { title: 'Logout', path: '/logout', id: 8 },
  ],
};

export const BaseHeader = ({ localCityData }: BaseHeaderProps) => {
  const { isLoggedIn } = useAuthContext();
  const { settings, translations } = useSettingsContext();
  const isDarkTheme = settings.theme === 'dark';
  const navLinks = isLoggedIn ? navItems.user : navItems.public;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full min-h-[70px] grid relative grid-cols-[1fr_3fr_1fr] dark:bg-slate-800 bg-amber-400">
      {localCityData && <WeatherLocalWidget localCityData={localCityData} />}

      <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />

      <nav className="p-4 md:flex flex-1 justify-center hidden col-start-2">
        <ul className="flex justify-center gap-2 text-slate-100">
          {navLinks.map(
            (link) =>
              link.title !== 'Settings' && (
                <li
                  key={link.id}
                  className="rounded px-3 py-1 transition-all hover:bg-amber-300 hover:dark:bg-slate-600 has-[.active]:bg-amber-300 dark:has-[.active]:bg-slate-600 text-slate-800 dark:text-slate-100"
                >
                  <NavLink to={link.path} className="inline-block text-xl leading-normal">
                    {translations?.linkTitles[link.title]}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>

      <div className="ml-auto text-slate-100 flex gap-4 items-center col-start-3">
        <div
          style={{ zIndex: isOpen ? 3200 : 2400 }}
          className="md:hidden tw-absolute-center-y right-0 z-50"
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="dark:bg-slate-800 bg-amber-400 rounded p-2 inline-flex items-center justify-center dark:text-slate-100 text-slate-800 dark:hover:bg-gray-700 hover:bg-amber-300 focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            {!isOpen ? (
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="hover:bg-amber-300 hidden md:flex hover:dark:bg-slate-600 has-[.active]:bg-amber-300 dark:has-[.active]:bg-slate-600 w-10 h-10 p-1 ">
          <NavLink to="/settings">
            {isDarkTheme && <img src="/cog-configure-gear-svgrepo-com.svg" />}
            {!isDarkTheme && <img src="/cog-configure-gear-svgrepo-com-dark.svg" />}
          </NavLink>
        </div>
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
