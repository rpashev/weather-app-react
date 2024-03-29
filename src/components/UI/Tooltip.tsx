import { ReactNode, useState } from 'react';

type TooltipProps = {
  children: ReactNode;
  content: string;
  disable?: boolean;
};

export const Tooltip = ({ children, content, disable }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
        <div className="absolute z-10 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow whitespace-nowrap">
          {content}
        </div>
      )}
    </div>
  );
};
