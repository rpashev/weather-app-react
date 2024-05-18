import { NavLink } from 'react-router-dom';
import { Backdrop } from '../UI/Backdrop';
import { navItems } from './BaseHeader';
import { useAuthContext } from '../../context/user-context';
import { ThemeToggle } from '../UI/ThemeToggle';
import { type LanguageMapType } from '../../common/languages/en';
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';

type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  translations: LanguageMapType;
};

export const iconLinkMap = {
  Login: ArrowLeftEndOnRectangleIcon,
  Home: HomeIcon,
  ['Sign Up']: UserPlusIcon,
  Logout: ArrowLeftStartOnRectangleIcon,
  Map: GlobeAltIcon,
  Settings: Cog6ToothIcon,
};

export const MobileNavigation = ({ isOpen, setIsOpen, translations }: PropsType) => {
  const { isLoggedIn } = useAuthContext();
  const navLinks = isLoggedIn ? navItems.user : navItems.public;

  return (
    <div className="md:hidden">
      {isOpen && <Backdrop onClickBackdrop={() => setIsOpen(false)} />}
      <nav
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} dark:bg-slate-800 bg-amber-400 transition-all ease-out duration-300 h-screen fixed top-0 right-0 pt-20 w-3/4`}
        style={{ zIndex: 3000 }}
      >
        {isOpen && (
          <ul className="flex flex-col inset-x-0 justify-center text-slate-100">
            {navLinks.map((link) => {
              const Icon = iconLinkMap[link.title];
              return (
                <li onClick={() => setIsOpen(false)} key={link.id}>
                  <NavLink
                    to={link.path}
                    className="flex gap-4 w-full text-xl leading-normal p-4 transition-all hover:bg-amber-300 hover:dark:bg-slate-600 has-[.active]:bg-amber-300 dark:has-[.active]:bg-slate-600 text-black dark:text-slate-100"
                  >
                    <Icon className="w-8 text-slate-800 dark:text-slate-100" />
                    <span>{translations?.linkTitles[link.title]}</span>
                  </NavLink>
                </li>
              );
            })}
            <li className="pt-6 px-3 absolute top-0 left-0">
              <ThemeToggle />
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
