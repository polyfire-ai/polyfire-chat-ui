import React from 'react';
import Markdown from 'react-markdown';
import { Message } from 'polyfire-js/hooks/useChat';
import { CopyButton } from '../../Buttons/CopyButton';
import { GPTIcon, UserIcon } from '../../Icons';
import { useChatContext } from '../../../contexts/ChatProvider';

const BubbleUserMessageSkeleton = () => (
  <div className="flex items-start animate-pulse w-2/4 ml-2 mb-2">
    <div className="flex-shrink-0">
      <div className="mx-2 flex h-8 w-8 sm:mx-4 rounded-full bg-custom-700" />
    </div>
    <div className="flex flex-col flex-grow h-16 rounded-b-xl rounded-tr-xl bg-custom-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl" />
  </div>
);

const BubbleBotMessageSkeleton = () => (
  <div className="flex flex-row-reverse items-start animate-pulse mr-2 mb-2">
    <div className="flex-shrink-0">
      <div className="mx-2 flex h-8 w-8 sm:mx-4 rounded-full bg-custom-700" />
    </div>
    <div className="flex flex-col flex-grow h-16 rounded-b-xl rounded-tl-xl bg-custom-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl" />
  </div>
);

export const BubbleHistoryLoadingComponent: React.FC = () => (
  <>
    <BubbleUserMessageSkeleton />
    <BubbleBotMessageSkeleton />
    <BubbleUserMessageSkeleton />
  </>
);

const BubbleUserReplyComponent = ({ content }: { content: string }) => (
  <div className="flex items-start ml-2 mb-2">
    <div className="flex-shrink-0">
      <UserIcon className="h-8 w-8 rounded-full" />
    </div>
    <div className="flex flex-col flex-grow w-1/2 min-h-[85px] rounded-b-xl rounded-tr-xl bg-custom-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
      <Markdown className="prose text-custom-50">{content}</Markdown>
    </div>
  </div>
);

const BubbleBotReplyComponent = ({
  content,
  isLoading,
}: {
  content: string;
  isLoading?: boolean;
}) => (
  <div className="flex flex-row-reverse items-start mr-2 mb-2">
    <div className="flex-shrink-0">
      <GPTIcon className="h-8 w-8 rounded-full" />
    </div>
    <div className="flex flex-col flex-grow  w-1/2 min-h-[85px] rounded-b-xl rounded-tl-xl bg-custom-900 p-4 mr-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-pulse-slow h-2 w-2 bg-white rounded-full" />
        </div>
      ) : (
        <>
          <Markdown className="prose text-custom-50">{content}</Markdown>
          <div className="mt-2 flex flex-row gap-2 text-custom-400">
            {content && <CopyButton textToCopy={content} />}
          </div>
        </>
      )}
    </div>
  </div>
);

export const BubbleChatListItem: React.FC<Message> = ({
  content,
  is_user_message: isUser,
  id,
}: Message) => {
  const { answer, history } = useChatContext();

  return (
    <>
      {isUser ? (
        <BubbleUserReplyComponent content={content} />
      ) : (
        <BubbleBotReplyComponent content={content} />
      )}

      {history.data?.[history.data.length - 1]?.id === id && isUser && (
        <BubbleBotReplyComponent
          content={answer.data?.content || ''}
          isLoading={answer.loading}
        />
      )}
    </>
  );
};
