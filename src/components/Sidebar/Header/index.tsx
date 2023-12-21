import React, { ComponentType, ReactNode } from 'react';

export type SidebarHeaderProps = {
  Logo?: ComponentType<{ className?: string }>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  logoProps?: React.SVGAttributes<SVGSVGElement>;
  name?: string | ReactNode;
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>;
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  Logo,
  containerProps: {
    className: containerClassName = '',
    ...containerProps
  } = {},
  logoProps: { className: logoClassName = '', ...logoProps } = {},
  titleProps: { className: titleClassName = '', ...titleProps } = {},
  name = 'Polyfire Chatbot',
}) => (
  <div
    className={`flex items-center py-4 space-x-2 ${containerClassName}`}
    {...containerProps}
  >
    {Logo && (
      <Logo className={`h-5 w-5 text-white ${logoClassName}`} {...logoProps} />
    )}
    <h2
      className={`text-lg font-medium text-custom-100 ${titleClassName}`}
      {...titleProps}
    >
      {name}
    </h2>
  </div>
);
