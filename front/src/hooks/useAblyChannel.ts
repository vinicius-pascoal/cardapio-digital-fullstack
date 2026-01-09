import { useEffect, useCallback } from 'react';
import * as Ably from 'ably';
import {
  getAblyClient,
  subscribeToChannel,
  unsubscribeFromChannel,
  publishToChannel,
} from '@/lib/ably';

interface UseAblyChannelOptions {
  onMessage?: (message: Ably.Types.Message) => void;
  onError?: (error: Error) => void;
}

export function useAblyChannel(
  channelName: string,
  options: UseAblyChannelOptions = {}
) {
  const { onMessage, onError } = options;

  useEffect(() => {
    let isSubscribed = true;

    const setupSubscription = async () => {
      try {
        if (onMessage) {
          await subscribeToChannel(channelName, (message) => {
            if (isSubscribed) {
              onMessage(message);
            }
          });
        }
      } catch (error) {
        if (isSubscribed && onError) {
          onError(error instanceof Error ? error : new Error(String(error)));
        }
      }
    };

    setupSubscription();

    return () => {
      isSubscribed = false;
      unsubscribeFromChannel(channelName);
    };
  }, [channelName, onMessage, onError]);
}

export async function usePublishMessage(
  channel: string,
  event: string,
  data: any
) {
  try {
    await publishToChannel(channel, event, data);
  } catch (error) {
    console.error('Failed to publish message:', error);
    throw error;
  }
}

export async function useAblyClient() {
  return await getAblyClient();
}
