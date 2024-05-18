import { CheckIcon } from '@heroicons/react/16/solid';

type Props = {
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>> | ((val: boolean) => void);
  isChecked: boolean;
};

export const BaseToggle = ({ setIsChecked, isChecked }: Props) => {
  return (
    <div className="flex h-full w-14 items-center justify-center">
      <button
        onClick={() => setIsChecked(!isChecked)}
        className={`relative h-6 w-12 dark:bg-slate-100 bg-slate-600 rounded-full transition-colors duration-300 ease-in-out`}
      >
        <div
          className={`absolute top-1/2 h-6 w-6 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
            isChecked
              ? '-translate-y-1/2 translate-x-full transform'
              : '-translate-y-1/2 dark:bg-slate-500 bg-slate-200'
          }`}
        >
          {isChecked && <CheckIcon className="w-full text-slate-100 rounded-full bg-green-500" />}
        </div>
      </button>
    </div>
  );
};
