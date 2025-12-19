'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useSessionContext, useSessionMessages } from '@livekit/components-react';
import { ChatTranscript } from '@/components/app/chat-transcript';
import { PreConnectMessage } from '@/components/app/preconnect-message';
import { TileLayout } from '@/components/app/tile-layout';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/livekit/agent-control-bar/agent-control-bar';
import { cn } from '@/lib/utils';
import type { AppConfig } from '../../../app-config';
import { ScrollArea } from '../livekit/scroll-area/scroll-area';

const MotionBottom = motion.create('div');

const BOTTOM_VIEW_MOTION_PROPS = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
  transition: {
    duration: 0.25,
    ease: 'easeOut' as const,
  },
};

interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({ appConfig }: SessionViewProps) => {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);
  const [chatOpen, setChatOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
  };

  useEffect(() => {
    const last = messages.at(-1);
    if (last?.from?.isLocal && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="bg-background flex h-full w-full flex-col overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="relative min-h-0 flex-1">
        {/* CHAT */}
        <ScrollArea ref={scrollAreaRef} className="h-full px-4 py-6 pb-40 md:px-6">
          <ChatTranscript
            hidden={!chatOpen}
            messages={messages}
            className="mx-auto max-w-2xl space-y-3"
          />
        </ScrollArea>

        {/* TILE OVERLAY */}
        <TileLayout chatOpen={chatOpen} />
      </div>

      {/* BOTTOM BAR */}
      <MotionBottom {...BOTTOM_VIEW_MOTION_PROPS} className="bg-background shrink-0">
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="px-4 pt-3" />
        )}

        <div className="mx-auto max-w-2xl px-4 pb-4 md:px-6">
          <AgentControlBar
            controls={controls}
            isConnected={session.isConnected}
            onDisconnect={session.end}
            onChatOpenChange={setChatOpen}
          />
        </div>
      </MotionBottom>
    </section>
  );
};
