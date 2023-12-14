import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GPTIcon, UserIcon } from '../../Icons';
import CopyButton from '../../Buttons/CopyButton';
import { ChatWithProps } from '../../../types';

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
        <div className="h-3 rounded bg-custom-700 w-11" />
      </div>
    </div>
  </div>
);

export const MinimalHistoryLoadingComponent = () => (
  <>
    <MinimalUserMessageSkeleton />
    <MinimalBotMessageSkeleton />
    <MinimalUserMessageSkeleton />
  </>
);

export const MinimalUserReplyComponent = ({ content }: ChatWithProps) => (
  <div className="flex px-4 py-8 sm:px-6">
    <UserIcon />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <p className="max-w-3xl">{content}</p>
    </div>
  </div>
);

export const MinimalBotReplyComponent = ({ content }: ChatWithProps) => (
  <div className="flex bg-custom-900 px-4 py-8 sm:px-6">
    <GPTIcon />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <div className="flex items-center break-words">
        <Markdown className="inline max-w-3xl" remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </div>

      <div className="mt-4 flex flex-row justify-start gap-x-2 text-custom-400 lg:mt-0">
        {content && <CopyButton textToCopy={content} />}
      </div>
    </div>
  </div>
);

export const MinimalBotLoadingCard = () => (
  <div className="flex bg-custom-900 px-4 py-8 sm:px-6">
    <GPTIcon />
    <div className="flex w-full flex-row items-center">
      <div className="ml-4 animate-pulse-slow h-2 w-2 bg-white rounded-full" />
    </div>
  </div>
);
