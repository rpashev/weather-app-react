export const Spinner = () => {
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      role="status"
    >
      <div className="animate-spin h-14 w-14 rounded-full border-[6px] border-solid border-slate-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
