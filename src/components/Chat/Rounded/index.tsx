import Markdown from 'react-markdown';
import { Message } from 'polyfire-js/hooks/useChat';
import React from 'react';

import { CopyButton } from '../../Buttons/CopyButton';
import { UserIcon, GPTIcon } from '../../Icons';
import { useChatContext } from '../../../contexts/ChatProvider';

const RoundedUserMessageSkeleton = () => (
  <div className="flex px-4 py-7 sm:px-6 animate-pulse m-3">
    <div className="h-8 w-8 rounded-full bg-custom-700 mr-4 self-center" />
    <div className="flex w-full flex-col lg:flex-row lg:justify-between">
      <div className="max-w-3xl w-full self-center">
        <div className="h-3 rounded bg-custom-700 w-full" />
      </div>
    </div>
  </div>
);

const RoundedBotMessageSkeleton = () => (
  <div className="flex px-4 py-7 sm:px-6 animate-pulse bg-custom-900 rounded-xl m-3">
    <div className="mr-2 flex h-8 w-8 rounded-full bg-custom-800 sm:mr-4" />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <div className="inline max-w-3xl w-full space-y-4">
        <div className="h-3 rounded bg-custom-800 w-full" />
        <div className="h-3 rounded bg-custom-800 w-11/12" />
      </div>
      <div className="mt-4 flex w-full flex-row justify-start gap-x-2 text-custom-400 lg:mt-0">
        <div className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export const RoundedHistoryLoadingComponent: React.FC = () => (
  <>
    <RoundedUserMessageSkeleton />
    <RoundedBotMessageSkeleton />
    <RoundedUserMessageSkeleton />
  </>
);

const RoundedUserReplyComponent = ({ content }: { content: string }) => (
  <div className="flex px-4 py-8 sm:px-6 m-3">
    <UserIcon className="mr-2 flex h-8 w-8 rounded-full sm:mr-4" />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <p className="max-w-3xl text-custom-50">{content}</p>
    </div>
  </div>
);

const RoundedBotReplyComponent = ({
  content,
  isLoading,
}: {
  content: string;
  isLoading?: boolean;
}) => (
  <div className="flex items-start px-4 py-8 sm:px-6 bg-custom-900 rounded-xl m-3">
    <div className="flex items-center mr-2 sm:mr-4">
      <GPTIcon className="h-8 w-8 rounded-full" />
    </div>
    <div className="flex flex-grow flex-col lg:flex-row lg:justify-between">
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-pulse-slow h-2 w-2 bg-white rounded-full" />
        </div>
      ) : (
        <Markdown className="inline max-w-3xl text-custom-50 rounded-xl">
          {content}
        </Markdown>
      )}
      <div className="mt-4 lg:mt-0">
        <CopyButton textToCopy={content} aria-disabled={isLoading} />
      </div>
    </div>
  </div>
);

export const RoundedChatListItem: React.FC<Message> = ({
  content,
  is_user_message: isUser,
  id,
}: Message) => {
  const { answer, history } = useChatContext();

  return (
    <>
      {isUser ? (
        <RoundedUserReplyComponent content={content} />
      ) : (
        <RoundedBotReplyComponent content={content} />
      )}

      {history.data?.[history.data.length - 1]?.id === id && isUser && (
        <RoundedBotReplyComponent
          content={answer.data?.content || ''}
          isLoading={answer.loading}
        />
      )}
    </>
  );
};
