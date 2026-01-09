import Ably from 'ably';

let ablyClient: Ably.Realtime | null = null;

export function initializeAbly(): Ably.Realtime {
  if (!ablyClient) {
    const apiKey = process.env.ABLY_KEY;
    if (!apiKey) {
      throw new Error('ABLY_KEY environment variable is not set');
    }

    ablyClient = new Ably.Realtime({
      key: apiKey,
      echoMessages: false,
      autoConnect: true,
    });

    ablyClient.connection.on('connected', () => {
      console.log('Ably Connected');
    });

    ablyClient.connection.on('disconnected', () => {
      console.log('Ably Disconnected');
    });

    ablyClient.connection.on('failed', (err) => {
      console.error('Ably Connection Failed:', err.message);
    });
  }

  return ablyClient;
}

export function getAblyClient(): Ably.Realtime {
  if (!ablyClient) {
    return initializeAbly();
  }
  return ablyClient;
}

export function publishMessage(channel: string, event: string, data: any) {
  const client = getAblyClient();
  client.channels.get(channel).publish(event, data, (err) => {
    if (err) {
      console.error(`Failed to publish to ${channel}:`, err.message);
    } else {
      console.log(`Message published to ${channel}`);
    }
  });
}

export async function subscribeToChannel(
  channel: string,
  callback: (message: Ably.Types.Message) => void
) {
  const client = getAblyClient();
  const channelInstance = client.channels.get(channel);
  channelInstance.subscribe(callback);
}
