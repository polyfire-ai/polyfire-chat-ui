import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from 'polyfire-js/hooks/useChat';
import { GPTIcon, UserIcon } from '../../Icons';
import { CopyButton } from '../../Buttons/CopyButton';
import { useChatContext } from '../../../contexts/ChatProvider';

const MinimalUserMessageSkeleton = () => (
  <div className="flex px-4 py-7 sm:px-6 animate-pulse">
    <div className="h-10 w-10 rounded-full bg-custom-700 mr-4 self-center" />
    <div className="flex w-full flex-col lg:flex-row lg:justify-between">
      <div className="max-w-3xl w-full self-center">
        <div className="h-3 rounded bg-custom-700 w-full" />
      </div>
    </div>
  </div>
);

const MinimalBotMessageSkeleton = () => (
  <div className="bg-custom-900 flex px-4 py-7 sm:px-6 animate-pulse">
    <div className="h-10 w-10 rounded-full bg-custom-700 mr-4 self-center" />
    <div className="flex w-full flex-col lg:flex-row lg:justify-between">
      <div className="max-w-3xl w-full space-y-4">
        <div className="h-3 rounded bg-custom-700 w-full" />
        <div className="h-3 rounded bg-custom-700 w-11/12" />
      </div>
    </div>
  </div>
);

export const MinimalHistoryLoadingComponent: React.FC = () => (
  <>
    <MinimalUserMessageSkeleton />
    <MinimalBotMessageSkeleton />
    <MinimalUserMessageSkeleton />
  </>
);

const MinimalUserReplyComponent = ({ content }: { content: string }) => (
  <div className="flex px-4 py-8 sm:px-6">
    <UserIcon className="mr-2 h-10 w-10" />
    <p className="max-w-3xl text-custom-50">{content}</p>
  </div>
);

const MinimalBotReplyComponent = ({
  content,
  isLoading,
}: {
  content: string;
  isLoading?: boolean;
}) => (
  <div className="flex items-center bg-custom-900 px-4 py-8 sm:px-6">
    <GPTIcon className="mr-2 h-10 w-10" />
    {isLoading ? (
      <div className="ml-4 animate-pulse-slow h-2 w-2 bg-white rounded-full" />
    ) : (
      <div className="flex w-full flex-col lg:flex-row lg:justify-between">
        <Markdown
          className="inline max-w-3xl text-custom-50"
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </Markdown>
        <CopyButton textToCopy={content} />
      </div>
    )}
  </div>
);

export const MinimalChatListItem: React.FC<Message> = ({
  content,
  is_user_message: isUser,
  id,
}: Message) => {
  const { answer, history } = useChatContext();

  return (
    <>
      {isUser ? (
        <MinimalUserReplyComponent content={content} />
      ) : (
        <MinimalBotReplyComponent content={content} />
      )}

      {history.data?.[history.data.length - 1]?.id === id && isUser && (
        <MinimalBotReplyComponent
          content={answer.data?.content || ''}
          isLoading={answer.loading}
        />
      )}
    </>
  );
};
