import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CopyButton from '../../Buttons/CopyButton';
import { GPTIcon, UserIcon } from '../../Icons';
import { ChatWithProps } from '../../../types';

const BubbleUserMessageSkeleton = () => (
  <div className="flex items-start animate-pulse w-2/4">
    <div className="flex-shrink-0">
      <div className="mx-2 flex h-8 w-8 sm:mx-4 rounded-full bg-custom-700" />
    </div>

    <div className="flex flex-col flex-grow h-16 rounded-b-xl rounded-tr-xl bg-custom-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl" />
  </div>
);

const BubbleBotMessageSkeleton = () => (
  <div className="flex flex-row-reverse items-start animate-pulse">
    <div className="flex-shrink-0">
      <div className="mx-2 flex h-8 w-8 sm:mx-4 rounded-full bg-custom-700" />
    </div>
    <div className="flex flex-col flex-grow h-16 rounded-b-xl rounded-tl-xl bg-custom-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl" />
  </div>
);

export const BubbleHistoryLoadingComponent = () => (
  <>
    <BubbleUserMessageSkeleton />
    <BubbleBotMessageSkeleton />
    <BubbleUserMessageSkeleton />
  </>
);

export const BubbleUserReplyComponent = ({ content }: ChatWithProps) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <UserIcon />
    </div>

    <div className="flex flex-col flex-grow min-h-[85px] rounded-b-xl rounded-tr-xl bg-custom-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
      <Markdown className="prose" remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </div>
  </div>
);

export const BubbleBotReplyComponent = ({ content }: ChatWithProps) => (
  <div className="flex flex-row-reverse items-start">
    <div className="flex-shrink-0">
      <GPTIcon />
    </div>
    <div className="flex flex-col flex-grow min-h-[85px] rounded-b-xl rounded-tl-xl bg-custom-900 p-4 ml-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
      <Markdown className="prose" remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
      <div className="mt-2 flex flex-row gap-2 text-custom-400">
        {content && (
          <CopyButton textToCopy={content} className="hover:text-red-600" />
        )}
      </div>
    </div>
  </div>
);

export const BubbleBotLoadingComponent = () => (
  <div className="flex items-start animate-pulse w-full flex-row-reverse">
    <GPTIcon />
    <div className="flex rounded-b-xl rounded-tl-xl p-4 bg-custom-900 sm:max-w-md md:max-w-2xl">
      <div className="ml-4 animate-pulse-slow h-2 w-2 bg-white rounded-full" />
    </div>
  </div>
);
