import TextareaAutosize from 'react-textarea-autosize';
import React, { useCallback, ChangeEvent, KeyboardEvent } from 'react';
import { InputStyle, TextareaProps } from '../../../types';
import { useChatContext } from '../../../contexts/ChatProvider';

export const Input: React.FC<
  TextareaProps & { className?: string; style?: InputStyle }
> = ({ style, className, ...props }) => {
  const { history, utils, answer, prompt } = useChatContext();

  const { loading } = history;
  const { sendMessage } = utils;

  const onSendMessageHandler = useCallback(() => {
    if (prompt.value.length && !loading) {
      sendMessage(prompt.value).then(() => {
        prompt.onChange('');
      });
    }
  }, [prompt.value, loading]);

  const onPromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    prompt.onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessageHandler();
    }
  };

  return (
    <TextareaAutosize
      {...props}
      style={style}
      autoFocus
      id="chat"
      minRows={1}
      maxRows={10}
      value={prompt.value}
      className={`mx-2 flex min-h-full w-full rounded-md border  p-2 text-base border-custom-700 bg-custom-800 text-custom-50 placeholder-custom-400 focus:border-custom-600 focus:ring-custom-600 ${className}`}
      onChange={onPromptChange}
      disabled={answer.loading}
      onKeyDown={handleKeyDown}
      placeholder={props.placeholder || 'Type a message...'}
      rows={1}
    />
  );
};

export const Prompt: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { className?: string }
> = ({ children, className, ...props }) => (
  <div
    {...props}
    className={`flex w-full items-center p-2 border-custom-700 bg-custom-900 ${className}`}
  >
    {children}
  </div>
);
