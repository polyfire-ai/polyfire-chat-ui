// ScrollToBottomButtonButton.tsx

import React from 'react';
import { ScrollBehavior } from '../../types';

export type ScrollToBottomButtonProps = {
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick: (behavior: ScrollBehavior) => void;
};

const DefaultIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="m-1 text-custom-50"
  >
    <path
      d="M17 13L12 18L7 13M12 6L12 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({
  disabled = false,
  onClick,
  className = '',
  icon = <DefaultIcon />,
}) => (
  <div className="relative">
    {!disabled && (
      <button
        type="button"
        aria-label="Scroll to bottom"
        onClick={() => onClick('smooth')}
        className={`cursor-pointer absolute z-10 rounded-full bg-clip-padding border border-white/10 bg-white/10 text-custom-50 right-1/2 transform translate-x-1/2 bottom-[calc(100%+10px)] ${className}`}
      >
        {icon}
      </button>
    )}
  </div>
);
