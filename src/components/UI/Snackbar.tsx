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
  }, []);

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
    <p
      className={`tw-fixed-center-x bottom-16 ${showSnackbar ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'} w-full font-semibold rounded px-4 py-[14px] text-center tracking-wider
       text-white transition-all duration-300 sm:w-auto max-w-[600px] ${getBackgroundColor()}`}
    >
      <div className="flex gap-3 items-center justify-between">
        {mode == 'error' && <ExclamationCircleIcon className="w-7 text-slate-100" />}
        {mode == 'warning' && <ExclamationTriangleIcon className="w-7 text-amber-400" />}
        {mode == 'success' && <CheckIcon className="w-7 text-slate-100" />}
        <span>{message}</span>
      </div>
    </p>
  );
};
