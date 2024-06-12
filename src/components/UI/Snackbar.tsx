import { useState, useEffect } from 'react';
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/16/solid';

type Props = {
  mode: 'warning' | 'error' | 'success';
  message: string;
};
export const Snackbar = ({ mode, message }: Props) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(true);
    }, 100);

    const hideTimer = setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [mode, message]);

  const getBackgroundColor = () => {
    switch (mode) {
      case 'warning':
        return 'bg-yellow-600';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-600';
    }
  };

  return (
    <div
      className={`tw-fixed-center-x flex gap-3 items-center bottom-16 ${showSnackbar ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'} font-semibold rounded px-3 py-[10px] text-center tracking-wider
       text-white transition-all duration-300 max-w-[400px] w-full sm:w-auto ${getBackgroundColor()}`}
    >
      {mode == 'error' && <ExclamationCircleIcon className="min-w-8 max-w-8 text-slate-100" />}
      {mode == 'warning' && <ExclamationTriangleIcon className="min-w-8 max-w-8 text-amber-400" />}
      {mode == 'success' && <CheckIcon className="min-w-8 max-w-8 text-slate-100" />}
      <div className="flex-grow">{message}</div>
    </div>
  );
};
