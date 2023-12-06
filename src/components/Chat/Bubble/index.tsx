import React, { memo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatInstance, Message } from 'polyfire-js/hooks/useChat';
import CopyButton from '../../Buttons/CopyButton';
import { GPTIcon, UserIcon } from '../../Icons';

const BubbleChatUserCard = ({ content }: { content: string }) => (
  <div className="flex items-start fade-in card-min-height">
    <div className="flex-shrink-0">
      <UserIcon />
    </div>

    <div className="flex flex-col flex-grow min-h-[85px] rounded-b-xl rounded-tr-xl bg-stone-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
      <Markdown className="prose" remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </div>
  </div>
);

const BubbleChatBotCard = ({ content }: { content: string }) => (
  <div className="flex flex-row-reverse items-start fade-in card-min-height">
    <div className="flex-shrink-0">
      <GPTIcon />
    </div>
    <div className="flex flex-col flex-grow min-h-[85px] rounded-b-xl rounded-tl-xl bg-stone-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
      <Markdown className="prose" remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
      <div className="mt-2 flex flex-row gap-2 text-stone-500">
        <CopyButton textToCopy={content} />
      </div>
    </div>
  </div>
);

type BubbleChatSkeletonCardProps = {
  index: number;
};

const BubbleChatSkeletonCard = memo(
  ({ index }: BubbleChatSkeletonCardProps) => {
    const isEven = index % 2 === 0;

    const widthClasses = [
      'w-48',
      'w-52',
      'w-56',
      'w-60',
      'w-64',
      'w-72',
      'w-80',
      'w-96',
    ];

    const randomWidthClass =
      widthClasses[Math.floor(Math.random() * widthClasses.length)];

    return (
      <div
        className={`flex items-start animate-pulse w-full card-min-height ${
          isEven ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <div className="h-8 w-8 rounded-full bg-stone-700 m-2" />
        <div
          className={`flex ${randomWidthClass} ${
            isEven ? 'rounded-b-xl rounded-tr-xl' : 'rounded-b-xl rounded-tl-xl'
          } p-4 bg-stone-900 sm:max-w-md md:max-w-2xl`}
        >
          <div className="h-4 rounded bg-stone-700" />
        </div>
      </div>
    );
  }
);

const ConversationBotLoadingCard = () => (
  <div className="flex items-start animate-pulse w-full card-min-height flex-row-reverse">
    <GPTIcon />
    <div className="flex rounded-b-xl rounded-tl-xl p-4 bg-stone-900 sm:max-w-md md:max-w-2xl">
      <div className="ml-4 animate-pulse-slow h-2 w-2 bg-white rounded-full" />
    </div>
  </div>
);

const BubbleChat = ({
  conversation,
  loading,
  answer,
}: {
  answer: ChatInstance['answer'];
  conversation: Message[];
  loading: boolean;
}) => (
  <div className="flex-1 space-y-6 overflow-y-auto rounded-xl p-4 text-sm leading-6 shadow-sm text-stone-300 sm:text-base sm:leading-7">
    {loading ? (
      <>
        {[...Array(3)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BubbleChatSkeletonCard key={index} index={index} />
        ))}
      </>
    ) : (
      <>
        {conversation?.map((message: Message) =>
          message.is_user_message ? (
            <BubbleChatUserCard key={message.id} content={message.content} />
          ) : (
            <BubbleChatBotCard key={message.id} content={message.content} />
          )
        )}
        {answer.loading && <ConversationBotLoadingCard />}
        {answer.data && <BubbleChatBotCard content={answer.data.content} />}
      </>
    )}
  </div>
);

export default BubbleChat;
