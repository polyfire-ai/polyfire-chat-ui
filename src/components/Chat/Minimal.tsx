import { Message } from 'polyfire-js/hooks/useChat.js';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GPTIcon, UserIcon } from '../Icons';
import CopyButton from '../Buttons/CopyButton';
import SendButton from '../Buttons/SendButton';
import { useChatContext } from '../../contexts/ChatProvider';

const ConversationUserCard = ({ content }: { content: string }) => (
  <div className="flex bg-stone-800 px-4 py-8 sm:px-6">
    <UserIcon />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <p className="max-w-3xl">{content}</p>
    </div>
  </div>
);

const ConversationBotLoadingCard = () => (
  <div className="flex bg-stone-900 px-4 py-8 sm:px-6">
    <GPTIcon />
    <div className="flex w-full flex-row items-center">
      <div className="ml-4 animate-pulse-slow h-2 w-2 bg-white rounded-full" />
    </div>
  </div>
);

const ConversationUserCardSkeleton = () => (
  <div className="flex px-4 py-7 sm:px-6 animate-pulse">
    <div className="h-10 w-10 rounded-full bg-stone-700 mr-4 self-center" />
    <div className="flex w-full flex-col lg:flex-row lg:justify-between">
      <div className="max-w-3xl w-full self-center">
        <div className="h-3 rounded bg-stone-700 w-full" />
      </div>
    </div>
  </div>
);
const ConversationBotCardSkeleton = () => (
  <div className="bg-stone-900 flex px-4 py-7 sm:px-6 animate-pulse">
    <div className="h-10 w-10 rounded-full bg-stone-700 mr-4 self-center" />
    <div className="flex w-full flex-col lg:flex-row lg:justify-between">
      <div className="max-w-3xl w-full space-y-4">
        <div className="h-3 rounded bg-stone-700 w-full" />
        <div className="h-3 rounded bg-stone-700 w-11" />
      </div>
    </div>
  </div>
);

const ConversationCardSkeleton = () => (
  <>
    <ConversationUserCardSkeleton />
    <ConversationBotCardSkeleton />
    <ConversationUserCardSkeleton />
  </>
);

const ConversationBotCard = ({ content }: { content: string }) => (
  <div className="flex bg-stone-900 px-4 py-8 sm:px-6">
    <GPTIcon />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <div className="flex items-center break-words">
        <Markdown className="inline max-w-3xl" remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </div>

      <div className="mt-4 flex flex-row justify-start gap-x-2 text-stone-500 lg:mt-0">
        <CopyButton textToCopy={content} />
      </div>
    </div>
  </div>
);

const ConversationCard = memo(
  ({
    content,
    isUserMessage,
  }: {
    content: string;
    isUserMessage: Message['is_user_message'];
  }) =>
    isUserMessage === true ? (
      <ConversationUserCard content={content} />
    ) : (
      <ConversationBotCard content={content} />
    )
);

const Conversation = ({ messages }: { messages: Message[] }) =>
  messages &&
  messages.length > 0 &&
  messages.map((message: Message) => (
    <ConversationCard
      key={message.id}
      content={message.content}
      isUserMessage={message.is_user_message}
    />
  ));

const MinimalChat = () => {
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

  const divRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = useCallback(() => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      setIsAtBottom(scrollTop + clientHeight === scrollHeight);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (divRef.current && isAtBottom) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [isAtBottom]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (divRef.current && isAtBottom) {
      timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(history.data)]);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (data?.length) {
      setConversation(data.slice().reverse());
    } else {
      setConversation([]);
    }
  }, [JSON.stringify(history)]);

  return (
    <>
      <div
        ref={divRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto text-sm leading-6 shadow-md bg-stone-800 text-stone-300 sm:text-base sm:leading-7"
      >
        {history.loading ? (
          <ConversationCardSkeleton />
        ) : (
          <Conversation messages={conversation} />
        )}
        {answer.loading && <ConversationBotLoadingCard />}
        {answer.data && <ConversationBotCard content={answer.data?.content} />}
      </div>
      <div className="flex w-full items-center rounded-b-md border-t p-2 border-stone-700 bg-stone-900">
        <TextareaAutosize
          autoFocus
          id="chat"
          minRows={1}
          maxRows={10}
          value={prompt}
          className="mx-2 flex min-h-full w-full rounded-md border  p-2 text-base border-stone-700 bg-stone-800 text-stone-50 placeholder-stone-400 focus:border-red-600 focus:ring-red-600"
          placeholder="Enter your prompt"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          disabled={answer.loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          rows={1}
        />
        <SendButton onClick={() => handleSendMessage()} />
      </div>
    </>
  );
};

export default MinimalChat;
