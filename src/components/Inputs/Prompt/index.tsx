import TextareaAutosize from 'react-textarea-autosize';
import { useState, useCallback, ChangeEvent, KeyboardEvent } from 'react';
import SendButton from '../../Buttons/SendButton';
import { ChatWithProps, InputStyle, TextareaProps } from '../../../types';

export const Prompt = ({
  chatInstance,
  style,
  className,
  ...props
}: ChatWithProps &
  TextareaProps & { className?: string; style?: InputStyle }) => {
  const [prompt, setPrompt] = useState('');

  if (!chatInstance) {
    return null;
  }

  const { history, utils, answer } = chatInstance;

  const { loading } = history;
  const { onSendMessage } = utils;

  const onSendMessageHandler = useCallback(() => {
    if (prompt.length && !loading) {
      onSendMessage(prompt).then(() => {
        setPrompt('');
      });
    }
  }, [prompt, loading]);

  const onPromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessageHandler();
    }
  };

  return (
    <div className="flex relative w-full items-center rounded-b-md border-t p-2 border-custom-700 bg-custom-900 thin-scrollbar-x">
      <TextareaAutosize
        {...props}
        style={style}
        autoFocus
        id="chat"
        minRows={1}
        maxRows={10}
        value={prompt}
        className={`mx-2 flex min-h-full w-full rounded-md border  p-2 text-base border-custom-700 bg-custom-800 text-custom-50 placeholder-custom-400 focus:border-red-600 focus:ring-red-600 ${className}`}
        onChange={onPromptChange}
        disabled={answer.loading}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder || 'Type a message...'}
        rows={1}
      />
      <SendButton onClick={onSendMessageHandler} />
    </div>
  );
};
