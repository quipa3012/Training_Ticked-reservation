'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSessionContext } from '@livekit/components-react';
import type { AppConfig } from '../../../app-config';
import { SessionView } from '@/components/app/session-view';
import { WelcomeView } from '@/components/app/welcome-view';
import BookingForm from '@/components/booking/BookingForm';

import { useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/stores/auth/AuthContext';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(SessionView);

const VIEW_MOTION_PROPS = {
  variants: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.5,
    ease: [0, 0, 1, 1],
  },
} as const;

interface ViewControllerProps {
  appConfig: AppConfig;
}

export function ViewController({ appConfig }: ViewControllerProps) {
  const { isConnected, start } = useSessionContext();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để tiếp tục');
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <BookingForm />

      <AnimatePresence mode="wait">
        {!isConnected && (
          <MotionWelcomeView
            key="welcome"
            {...VIEW_MOTION_PROPS}
            startButtonText={appConfig.startButtonText}
            onStartCall={start}
          />
        )}

        {isConnected && (
          <MotionSessionView
            key="session-view"
            {...VIEW_MOTION_PROPS}
            appConfig={appConfig}
          />
        )}
      </AnimatePresence>
    </>
  );
}
