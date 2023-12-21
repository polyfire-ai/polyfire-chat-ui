import React from 'react';

type SimpleProvider = 'github' | 'google';
type LoginWithFirebaseInput = {
  provider: 'firebase';
  token: string;
};
type LoginWithCustomInput = {
  provider: 'custom';
  token: string;
};
type LoginWithRawPolyfireTokenInput = {
  provider: 'raw-polyfire';
  token: string;
};
type LoginAnonymousInput = {
  email?: string;
  provider: 'anonymous';
};
type LoginFunctionInput =
  | SimpleProvider
  | {
      provider: SimpleProvider;
    }
  | LoginWithFirebaseInput
  | LoginWithCustomInput
  | LoginAnonymousInput
  | LoginWithRawPolyfireTokenInput;

export type Login = (input: LoginFunctionInput) => Promise<void>;

export type Provider = {
  icon: React.ReactElement;
  label: string;
  name: string;
  payload: LoginFunctionInput;
};

export const defaultProviders: Provider[] = [
  {
    name: 'GitHub',
    payload: 'github',
    icon: (
      <svg
        className="mr-2 h-5 w-5"
        aria-hidden="true"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        height="800"
        width="1200"
        viewBox="-74.4 -120.90175 644.8 725.4105"
      >
        <path d="M165.9 389.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2 .6-2-1.3-4.3-4.3-5.2-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 0C106.1 0 0 105.3 0 244c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5 21.3 0 42.8 2.9 62.8 8.5 0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 449.8 496 354.9 496 244 496 105.3 383.5 0 244.8 0zM97.2 344.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
      </svg>
    ),
    label: 'Login with GitHub',
  },
  {
    name: 'Google',
    payload: 'google',
    icon: (
      <svg
        className="mr-2 h-5 w-5"
        width="800px"
        height="800px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          fill="#4285F4"
          d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
        />
        <path
          fill="#34A853"
          d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
        />
        <path
          fill="#FBBC04"
          d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
        />
        <path
          fill="#EA4335"
          d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
        />
      </svg>
    ),
    label: 'Login with Google',
  },
];

const UnauthenticatedView = ({
  login,
  providers = defaultProviders,
}: {
  login: Login;
  providers?: Provider[];
}) => (
  <div className="flex h-screen w-screen flex-wrap items-center justify-center bg-custom-800 gap-4 p-4">
    {providers.map((provider) => (
      <button
        type="button"
        key={provider.name}
        onClick={() => login(provider.payload)}
        className="inline-flex items-center rounded-md bg-custom-900 px-4 py-2 text-sm font-medium text-custom-300 hover:bg-custom-700 focus:outline-none focus:ring focus:ring-custom-600 focus:ring-opacity-50"
      >
        {provider.icon}
        {provider.label}
      </button>
    ))}
  </div>
);

export default UnauthenticatedView;
