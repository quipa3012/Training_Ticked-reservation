import React, { useMemo } from 'react';
import { Track } from 'livekit-client';
import {
  BarVisualizer,
  type TrackReference,
  VideoTrack,
  useLocalParticipant,
  useTracks,
  useVoiceAssistant,
} from '@livekit/components-react';
import { cn } from '@/lib/utils';

const classNames = {
  grid: [
    'h-full w-full',
    'grid gap-x-2 place-content-center',
    'grid-cols-[1fr_1fr] grid-rows-[90px_1fr_90px]',
  ],
  agentChatOpenWithSecondTile: ['col-start-1 row-start-1', 'self-center justify-self-end'],
  agentChatOpenWithoutSecondTile: ['col-start-1 row-start-1', 'col-span-2', 'place-content-center'],
  agentChatClosed: ['col-start-1 row-start-1', 'col-span-2 row-span-3', 'place-content-center'],
  secondTileChatOpen: ['col-start-2 row-start-1', 'self-center justify-self-start'],
  secondTileChatClosed: ['col-start-2 row-start-3', 'place-content-end'],
};

export function useLocalTrackRef(source: Track.Source) {
  const { localParticipant } = useLocalParticipant();
  const publication = localParticipant.getTrackPublication(source);
  return useMemo<TrackReference | undefined>(
    () => (publication ? { source, participant: localParticipant, publication } : undefined),
    [source, publication, localParticipant]
  );
}

interface TileLayoutProps {
  chatOpen: boolean;
}

export function TileLayout({ chatOpen }: TileLayoutProps) {
  const {
    state: agentState,
    audioTrack: agentAudioTrack,
    videoTrack: agentVideoTrack,
  } = useVoiceAssistant();

  const [screenShareTrack] = useTracks([Track.Source.ScreenShare]);
  const cameraTrack = useLocalTrackRef(Track.Source.Camera);

  const isCameraEnabled = cameraTrack && !cameraTrack.publication.isMuted;
  const isScreenShareEnabled = screenShareTrack && !screenShareTrack.publication.isMuted;
  const hasSecondTile = isCameraEnabled || isScreenShareEnabled;

  const isAvatar = Boolean(agentVideoTrack);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-6 bottom-40 md:top-10 md:bottom-48">
      <div className="relative mx-auto h-full max-w-2xl px-4 md:px-0">
        <div className={cn(classNames.grid)}>
          {/* AGENT */}
          <div
            className={cn(
              'grid',
              !chatOpen && classNames.agentChatClosed,
              chatOpen && hasSecondTile && classNames.agentChatOpenWithSecondTile,
              chatOpen && !hasSecondTile && classNames.agentChatOpenWithoutSecondTile
            )}
          >
            {!isAvatar && agentAudioTrack && (
              <div className="bg-background aspect-square h-[90px] rounded-md border border-input/50 drop-shadow-sm">
                <BarVisualizer
                  barCount={5}
                  state={agentState}
                  options={{ minHeight: 5 }}
                  trackRef={agentAudioTrack}
                  className="flex h-full items-center justify-center gap-1"
                >
                  <span className="bg-muted data-[lk-highlighted=true]:bg-foreground min-h-2.5 w-2.5 rounded-full" />
                </BarVisualizer>
              </div>
            )}

            {isAvatar && agentVideoTrack && (
              <div className={cn(
                'overflow-hidden rounded-md bg-black',
                chatOpen ? 'h-[90px] w-[90px]' : 'w-full'
              )}>
                <VideoTrack
                  trackRef={agentVideoTrack}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SECOND TILE */}
          <div
            className={cn(
              'grid',
              chatOpen && classNames.secondTileChatOpen,
              !chatOpen && classNames.secondTileChatClosed
            )}
          >
            {(isCameraEnabled || isScreenShareEnabled) && (
              <div className="bg-muted aspect-square w-[90px] rounded-md overflow-hidden">
                <VideoTrack
                  trackRef={cameraTrack || screenShareTrack}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
