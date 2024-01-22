import React, { useEffect, useRef } from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { usePolyfire, useVoiceToText } from 'polyfire-js/hooks';
import { useChatContext } from '../../contexts/ChatProvider';

const LoadingSpinner: React.FC<
  { className: string } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div className="flex justify-center items-center">
    <div
      className={`animate-spin rounded-full h-5 w-5 border-b-2 border-white ${className}`}
      {...props}
    />
  </div>
);

export type AudioRecorderButtonProps =
  React.HTMLAttributes<HTMLButtonElement> & {
    className?: string;
    icon?: React.ReactNode;
    label?: string;
  };

export const AudioRecorderButton: React.FC<AudioRecorderButtonProps> = (
  props
) => {
  const {
    utils: { sendMessage },
    chat,
  } = useChatContext();

  const { models } = usePolyfire();

  const chatIdRef = useRef(chat.id);

  useEffect(() => {
    chatIdRef.current = chat.id;
  }, [chat.id]);

  const key = 'ArrowUp';

  const {
    isLoading,
    isRecording,
    stopRecording,
    startRecording,
    setIsLoading,
  } = useVoiceToText(
    {
      onStop: async (chunks: BlobPart[]) => {
        setIsLoading(true);
        const blob = new Blob(chunks, {
          type: 'audio/webm',
        });

        const arrayBuffer = await blob.arrayBuffer();
        const audioArray = new Uint8Array(arrayBuffer);
        const transcription = await models.transcribe(audioArray);

        sendMessage(transcription);

        setIsLoading(false);
      },
      startKey: key,
      stopKey: key,
    },
    [chat.id]
  );

  const handleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const renderChildren = () => {
    if (props.children) {
      return props.children;
    }

    return isRecording ? (
      <div className="h-2 w-2 bg-red-500 rounded-sm p-2.5" />
    ) : isLoading ? (
      <LoadingSpinner className="h-5 w-5" />
    ) : (
      <MicrophoneIcon className="h-5 w-5" />
    );
  };

  return (
    <button
      onClick={handleRecording}
      type="button"
      className="inline-flex items-center py-3 px-4 bg-custom-800 hover:bg-custom-800 rounded-md text-white font-medium text-xs"
      {...props}
    >
      {renderChildren()}
    </button>
  );
};
