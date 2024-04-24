type BackdropProps = {
  onClickBackdrop?: (val?: any) => void;
};

export const Backdrop = ({ onClickBackdrop }: BackdropProps) => {
  return (
    <div
      onClick={onClickBackdrop}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      style={{ zIndex: 2900 }}
    ></div>
  );
};
