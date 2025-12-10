import subscription from "../models/subscription";

export async function activateQueuedSubscriptions() {
  const now = new Date();

  const subscriptions = await subscription.find({
    status: "queued",
    startDate: { $lte: now },
  });

  for (const sub of subscriptions) {
    sub.status = "active";
    await sub.save();
  }
}

export function startSubscriptionScheduler() {
  setInterval(activateQueuedSubscriptions, 1000 * 60);
  console.log("Subscription scheduler started");
}
