// SendButton.tsx

import React, { useCallback } from 'react';
import { useChatContext } from '../../contexts/ChatProvider';
import { SendIcon } from '../Icons';

export type SendButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
};

export const SendButton: React.FC<SendButtonProps> = ({
  className = '',
  icon = <SendIcon />,
  label = 'Send Message',
  ...props
}) => {
  const { history, utils, prompt } = useChatContext();
  const { loading } = history;
  const { sendMessage } = utils;

  console.log(utils);

  const onSendMessageHandler = useCallback(() => {
    if (prompt.value.length && !loading) {
      sendMessage(prompt.value).then(() => {
        prompt.onChange('');
      });
    }
  }, [prompt.value, loading, sendMessage]);

  return (
    <button
      className={`inline-flex items-center justify-center text-custom-100 hover:text-custom-600 ${className}`}
      type="button"
      aria-label={label}
      onClick={onSendMessageHandler}
      {...props}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </button>
  );
};
