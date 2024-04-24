import { NavLink } from 'react-router-dom';
import { Backdrop } from '../UI/Backdrop';
import { navItems } from './BaseHeader';
import { useAuth } from '../../context/user-context';
import { ThemeToggle } from '../UI/ThemeToggle';
type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const MobileNavigation = ({ isOpen, setIsOpen, isDarkMode, toggleTheme }: PropsType) => {
  const { isLoggedIn } = useAuth();
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
            {navLinks.map((link) => (
              <li
                onClick={() => setIsOpen(false)}
                key={link.id}
                className="p-4 transition-all hover:bg-amber-300 hover:dark:bg-slate-600 has-[.active]:bg-amber-300 dark:has-[.active]:bg-slate-600 text-black dark:text-slate-100"
              >
                <NavLink to={link.path} className="inline-block w-full text-xl leading-normal">
                  {link.title}
                </NavLink>
              </li>
            ))}
            <li className="pt-6 px-3 absolute top-0 left-0">
              <ThemeToggle onThemeChanged={toggleTheme} isDarkMode={isDarkMode} />
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
