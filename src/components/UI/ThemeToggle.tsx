import { useSettingsContext } from '../../context/settings-context';
import { SunIcon, MoonIcon } from '@heroicons/react/16/solid';

export const ThemeToggle = () => {
  const { toggleDarkMode, settings } = useSettingsContext();
  const isDarkMode = settings.theme === 'dark';
  return (
    <div className="flex h-full w-14 items-center justify-center">
      <button
        onClick={toggleDarkMode}
        className={`relative h-7 w-12 rounded-full transition-colors duration-300 ease-in-out ${
          !isDarkMode ? 'bg-gray-600' : 'bg-gray-600'
        }`}
      >
        <div
          className={`absolute top-1/2 h-6 w-6 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
            isDarkMode
              ? '-translate-y-1/2 translate-x-full transform bg-orange-500'
              : '-translate-y-1/2 bg-gray-800'
          }`}
        >
          {!isDarkMode && <MoonIcon className="w-full text-slate-100 rounded-full bg-slate-900" />}
          {isDarkMode && <SunIcon className="w-full rounded-full" />}
        </div>
      </button>
    </div>
  );
};
