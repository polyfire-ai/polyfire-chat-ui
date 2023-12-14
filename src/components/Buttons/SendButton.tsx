import React from 'react';
import { SendIcon } from '../Icons';

const SendButton = (props: React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    className="inline-flex text-custom-100 hover:text-red-600 sm:p-2"
    type="button"
    aria-label="Send message"
    {...props}
  >
    <SendIcon />
    <span className="sr-only">Send message</span>
  </button>
);

export default SendButton;
