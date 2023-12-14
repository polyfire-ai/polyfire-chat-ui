import Markdown from 'react-markdown';
import CopyButton from '../../Buttons/CopyButton';
import { UserIcon, GPTIcon } from '../../Icons';
import { ChatWithProps } from '../../../types';

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

export const RoundedHistoryLoadingComponent = () => (
  <>
    <RoundedUserMessageSkeleton />
    <RoundedBotMessageSkeleton />
    <RoundedUserMessageSkeleton />
  </>
);

export const RoundedUserReplyComponent = ({ content }: ChatWithProps) => (
  <div className="flex px-4 py-8 sm:px-6 m-3">
    <UserIcon className="mr-2 flex h-8 w-8 rounded-full sm:mr-4" />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <p className="max-w-3xl text-custom-200">{content}</p>
    </div>
  </div>
);

export const RoundedBotReplyComponent = ({ content }: ChatWithProps) => (
  <div className="flex px-4 py-8 sm:px-6 bg-custom-900 rounded-xl m-3">
    <GPTIcon className="mr-2 flex h-8 w-8 rounded-full sm:mr-4" />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <Markdown className="inline max-w-3xl text-custom-200 rounded-xl">
        {content}
      </Markdown>
      <div className="mt-4 flex flex-row justify-start gap-x-2 text-custom-400 lg:mt-0">
        {content && <CopyButton textToCopy={content} />}
      </div>
    </div>
  </div>
);

export const RoundedBotLoadingCard = () => (
  <div className="flex px-4 py-8 sm:px-6 bg-custom-900 rounded-xl mx-3">
    <GPTIcon className="mr-2 flex h-8 w-8 rounded-full sm:mr-4" />
    <div className="flex w-full flex-row items-center">
      <div className="ml-4 animate-pulse-slow h-2 w-2 bg-white rounded-full" />
    </div>
  </div>
);
