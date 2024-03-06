export const dynamic = "force-dynamic"; // defaults to auto

const OneSignalSdk = require("@onesignal/node-onesignal");

const app_key_provider = {
  getToken() {
    return process.env.NEXT_ONESIGNAL_REST_API_KEY as string;
  },
};

const configuration = OneSignalSdk.createConfiguration({
  authMethods: {
    app_key: {
      tokenProvider: app_key_provider,
    },
  },
});

const client = new OneSignalSdk.DefaultApi(configuration);

export async function GET(request: Request) {
  const notification = new OneSignalSdk.Notification();
  notification.app_id = process.env.NEXT_ONESIGNAL_APP_ID as string;
  console.log({ notification });

  notification.included_segments = ["Total Subscriptions"];
  notification.contents = {
    en: "Hello OneSignal!",
  };
  const { id } = await client.createNotification(notification);

  return new Response(JSON.stringify({ id }));
}
