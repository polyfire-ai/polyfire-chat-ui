import { ChatInstance, Message } from 'polyfire-js/hooks/useChat.js';
import { memo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GPTIcon, UserIcon } from '../../Icons';
import CopyButton from '../../Buttons/CopyButton';

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

const MinimalChat = ({
  conversation,
  loading,
  answer,
}: {
  answer: ChatInstance['answer'];
  conversation: Message[];
  loading: boolean;
}) => (
  <>
    {loading ? (
      <ConversationCardSkeleton />
    ) : (
      <Conversation messages={conversation} />
    )}
    {answer.loading && <ConversationBotLoadingCard />}
    {answer.data && <ConversationBotCard content={answer.data?.content} />}
  </>
);

export default MinimalChat;
