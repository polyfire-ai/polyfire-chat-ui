import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

export const GoodIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
  </svg>
);

export const BadIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
  </svg>
);

export const CopyIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export const CheckIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
      fill="currentColor"
    />
  </svg>
);

export const GPTIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height="41"
    viewBox="0 0 41 41"
    width="41"
    className="mx-2 flex h-8 w-8 rounded-full sm:mx-4"
    {...props}
  >
    <circle cx="20.5" cy="20.5" r="20.5" fill="currentColor" />
    <path
      d="M40.5 20.5c0 10-8.9543 18-18 18s-18-8-18-18 8.9543-18 18-18 18 8 18 18z"
      fill="none"
    />
    <path
      d="M20.5 6c.5523 0 1 .44772 1 1v3.5411c5.1595.5081 9 4.6682 9 10.9589 0 4.9193-2.9601 8.1472-6.1962 9.9998 2.6386 1.1538 4.7822 3.2291 6.0239 5.8191-3.1206 2.0129-6.8373 3.1811-10.8269 3.1811-3.9897 0-7.7064-1.1682-9.827-3.1811 1.2416-2.5898 3.3849-4.6649 6.0232-5.8187-4.2366-1.8525-6.197-5.0806-6.197-10.0002 0-6.2907 3.8405-10.4508 9-10.9589V7c0-.55228.4477-1 1-1z"
      fill="#262626"
    />
  </svg>
);

export const UserIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    className="mx-2 flex h-8 w-8 rounded-full sm:mx-4"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20.5,0.5C9.4,0.5,0.5,9.4,0.5,20.5S9.4,40.5,20.5,40.5S40.5,31.6,40.5,20.5S31.6,0.5,20.5,0.5z M20.5,6
        c3.9,0,7,3.1,7,7s-3.1,7-7,7s-7-3.1-7-7S16.6,6,20.5,6z M20.5,36.5c-4.7,0-9-1.5-12.5-4c1-3.1,3-5.8,6-7.7c2-1.3,4.3-2,6.5-2
        s4.5,0.7,6.5,2c3,1.9,5,4.6,6,7.7C29.5,35,25.2,36.5,20.5,36.5z"
    />
  </svg>
);

export const SendIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 14l11 -11" />
    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
  </svg>
);

export const AddIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5l0 14" />
    <path d="M5 12l14 0" />
  </svg>
);
