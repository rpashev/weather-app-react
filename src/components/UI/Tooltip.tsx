import { ReactNode, useState } from 'react';

type TooltipProps = {
  children: ReactNode;
  content: string;
  disable?: boolean;
};

export const Tooltip = ({ children, content, disable }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  console.log(showTooltip, 'show');
  console.log(disable, 'disabled');
  console.log(showTooltip && !disable, 'show && !disable');

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {showTooltip && !disable && (
        <div
          className="animate-fade absolute -top-8 z-10 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow whitespace-nowrap"
          style={{ opacity: 1, transition: 'opacity 0.3s ease' }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
