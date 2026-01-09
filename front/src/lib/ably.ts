import * as Ably from 'ably';

let ablyClient: Ably.Realtime | null = null;

export async function initializeAblyClient(): Promise<Ably.Realtime> {
  if (!ablyClient) {
    const apiKey = process.env.NEXT_PUBLIC_ABLY_KEY;
    if (!apiKey) {
      throw new Error(
        'NEXT_PUBLIC_ABLY_KEY environment variable is not set'
      );
    }

    ablyClient = new Ably.Realtime({
      key: apiKey,
      echoMessages: false,
      autoConnect: true,
    });

    try {
      await ablyClient.connection.once('connected');
      console.log('Ably Connected');
    } catch (error) {
      console.error('Failed to connect to Ably:', error);
    }
  }

  return ablyClient;
}

export async function getAblyClient(): Promise<Ably.Realtime> {
  if (!ablyClient) {
    return initializeAblyClient();
  }
  return ablyClient;
}

export async function publishToChannel(
  channel: string,
  event: string,
  data: any
) {
  try {
    const client = await getAblyClient();
    const channelInstance = client.channels.get(channel);
    await channelInstance.publish(event, data);
    console.log(`Message published to ${channel}`);
  } catch (error) {
    console.error(`Failed to publish to ${channel}:`, error);
  }
}

export async function subscribeToChannel(
  channel: string,
  callback: (message: Ably.Types.Message) => void
) {
  try {
    const client = await getAblyClient();
    const channelInstance = client.channels.get(channel);
    await channelInstance.subscribe(callback);
  } catch (error) {
    console.error(`Failed to subscribe to ${channel}:`, error);
  }
}

export async function unsubscribeFromChannel(channel: string) {
  try {
    const client = await getAblyClient();
    const channelInstance = client.channels.get(channel);
    await channelInstance.unsubscribe();
  } catch (error) {
    console.error(`Failed to unsubscribe from ${channel}:`, error);
  }
}
