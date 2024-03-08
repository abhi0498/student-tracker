import supabaseServerComponentClient from "@/utils/supabase/server";
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
  const supabase = await supabaseServerComponentClient();
  const { data, error } = await supabase
    .from("alerts")
    .select("*, task:tasks(*)")
    .lte("notify_on", new Date().toISOString())
    .eq("is_sent", false);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  console.log({ data, error });
  const ids: string[] = [];
  if (data) {
    for (const alert of data) {
      const notification = new OneSignalSdk.Notification();
      notification.app_id = process.env.NEXT_ONESIGNAL_APP_ID as string;
      // notification.included_segments = ["Total Subscriptions"];
      notification.include_aliases = {
        external_id: [alert?.created_by],
      };
      notification.contents = {
        en: `${alert.task?.title} is pending!`,
      };
      notification.target_channel = "push";
      const a = await client.createNotification(notification);
      ids.push(a.id);
      await supabase.from("alerts").update({
        is_sent: true,
        sent_on: new Date().toISOString(),
      });
    }
  }

  return new Response(JSON.stringify({ ids }));
}
