import { MouseEventHandler } from 'react';
import { SendIcon } from '../Icons';

const SendButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    className="inline-flex text-stone-200 hover:text-red-600 sm:p-2"
    type="button"
    onClick={onClick}
  >
    <SendIcon />
    <span className="sr-only">Send message</span>
  </button>
);

export default SendButton;
