import { Backdrop } from '../UI/Backdrop';
type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MobileNavigation = ({ isOpen, setIsOpen }: PropsType) => {
  return (
    <div className={'md:hidden'}>
      {isOpen && <Backdrop onClickBackdrop={() => setIsOpen(false)} />}
      <div
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}  transition-all ease-out duration-300 bg-slate-800 h-screen fixed top-0 right-0 pt-16 w-3/4`}
        style={{ zIndex: 2000 }}
      >
        {isOpen && (
          <div className={`inset-x-0`}>
            <div className="bg-slate-800 py-2 px-4 space-y-1">
              {/* Your nav links here */}
              <a
                href="#"
                className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Link 1
              </a>
              <a
                href="#"
                className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Link 2
              </a>
              <a
                href="#"
                className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Link 3
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
