import {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import type { Message } from 'polyfire-js/hooks/useChat.js';
import TextareaAutosize from 'react-textarea-autosize';
import { useChatContext } from '../../contexts/ChatProvider';

import SendButton from '../Buttons/SendButton';
import Minimal from './Minimal';
import { MessageTheme } from '../ChatUI';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import BubbleChat from './Bubble';

const Chat = ({ theme }: { theme: MessageTheme }) => {
  const [prompt, setPrompt] = useState('');
  const { history, utils, answer } = useChatContext();

  const { onSendMessage } = utils;
  const { loading, data } = history;

  const [conversation, setConversation] = useState<Message[]>([]);

  const handleSendMessage = useCallback(() => {
    if (prompt.length && !loading) {
      onSendMessage(prompt).then(() => {
        setPrompt('');
      });
      setConversation([
        ...conversation,
        { content: prompt, is_user_message: true } as Message,
      ]);
    }
  }, [prompt, loading]);

  useEffect(() => {
    if (data?.length) {
      setConversation(data.slice().reverse());
    } else {
      setConversation([]);
    }
  }, [JSON.stringify(history)]);

  const onPromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onSendMessageHandler = () => {
    handleSendMessage();
  };

  const {
    ref: divRef,
    isAtBottom,
    scrollToBottom,
  } = useScrollToBottom<HTMLDivElement>([history.data, answer.data]);

  return (
    <>
      <div
        ref={divRef}
        className=" flex-1 overflow-y-auto text-sm leading-6 shadow-md bg-stone-800 text-stone-300 sm:text-base sm:leading-7"
      >
        {theme === 'classic' && (
          <Minimal
            loading={history.loading}
            answer={answer}
            conversation={conversation}
          />
        )}
        {theme === 'bubble' && (
          <BubbleChat
            loading={history.loading}
            conversation={conversation}
            answer={answer}
          />
        )}
      </div>

      <div className="relative flex w-full items-center rounded-b-md border-t p-2 border-stone-700 bg-stone-900">
        {!isAtBottom && (
          <button
            type="button"
            aria-labelledby="Scroll to bottom"
            onClick={scrollToBottom}
            className="cursor-pointer absolute z-10 rounded-full bg-clip-padding border border-white/10 bg-white/10 text-gray-200 right-1/2 transform translate-x-1/2 bottom-[calc(100%+10px)]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="m-1 text-white"
            >
              <path
                d="M17 13L12 18L7 13M12 6L12 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <TextareaAutosize
          autoFocus
          id="chat"
          minRows={1}
          maxRows={10}
          value={prompt}
          className="mx-2 flex min-h-full w-full rounded-md border  p-2 text-base border-stone-700 bg-stone-800 text-stone-50 placeholder-stone-400 focus:border-red-600 focus:ring-red-600"
          placeholder="Enter your prompt"
          onChange={onPromptChange}
          disabled={answer.loading}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <SendButton onClick={onSendMessageHandler} />
      </div>
    </>
  );
};

export default Chat;
