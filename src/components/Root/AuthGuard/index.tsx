import { usePolyfire } from 'polyfire-js/hooks/index.js';
import React, { ReactElement, ReactNode } from 'react';
import UnauthenticatedView, { Login, Provider } from './UnauthenticatedView';

export const AuthGuard = ({
  children,
  providers,
  UnauthenticatedViewComponent = UnauthenticatedView,
}: {
  UnauthenticatedViewComponent?: React.ComponentType<{
    login: Login;
    providers?: Provider[];
  }>;
  children: ReactNode;
  providers?: Provider[];
}): ReactElement | null => {
  const {
    auth: { login, status },
  } = usePolyfire();

  if (status === 'unauthenticated') {
    return <UnauthenticatedViewComponent login={login} providers={providers} />;
  }
  if (status === 'authenticated') {
    return <div>{children}</div>;
  }
  return (
    <div className="flex h-screen items-center justify-center bg-custom-800 text-custom-100">
      Loading...
    </div>
  );
};
