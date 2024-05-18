// REACT
import { useState } from 'react';
import { useAuthContext } from '../../context/user-context';
import { NavLink } from 'react-router-dom';
// COMPONENTS
import { ThemeToggle } from '../UI/ThemeToggle';
import { WeatherLocalWidget } from '../WeatherLocalWidget';
import { MobileNavigation, iconLinkMap } from './MobileNavigation';
import { Bars3Icon, XMarkIcon, Cog6ToothIcon } from '@heroicons/react/16/solid';
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
    { title: 'Settings', path: '/settings', id: 7 },
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

      <MobileNavigation translations={translations!} isOpen={isOpen} setIsOpen={setIsOpen} />

      <nav className="p-4 md:flex flex-1 justify-center hidden col-start-2">
        <ul className="flex justify-center gap-2 text-slate-100">
          {navLinks.map((link) => {
            const Icon = iconLinkMap[link.title];

            return (
              link.title !== 'Settings' && (
                <li key={link.id}>
                  <NavLink
                    title={translations?.linkTitles[link.title]}
                    to={link.path}
                    className="flex items-center text-xl rounded px-3 py-1 leading-normal transition-all hover:bg-amber-300 hover:dark:bg-slate-600 has-[.active]:bg-amber-300 dark:has-[.active]:bg-slate-600 text-slate-800 dark:text-slate-100"
                  >
                    <span className="hidden lg:flex">{translations?.linkTitles[link.title]}</span>
                    <Icon className="lg:hidden flex w-8 text-slate-800 dark:text-slate-100" />
                  </NavLink>
                </li>
              )
            );
          })}
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
            {!isOpen && <Bars3Icon className="h-8 w-8" />}
            {isOpen && <XMarkIcon className="h-8 w-8" />}

            <span className="sr-only">Open menu</span>
          </button>
        </div>
        <div className="hover:bg-amber-300 hidden md:flex hover:dark:bg-slate-600 has-[.active]:bg-amber-300 dark:has-[.active]:bg-slate-600 w-10 h-10 p-1 ">
          <NavLink to="/settings" title={translations?.linkTitles.Settings}>
            <Cog6ToothIcon
              className={`w-full ${isDarkTheme ? 'text-slate-100' : 'text-slate-800'}`}
            />
          </NavLink>
        </div>
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
