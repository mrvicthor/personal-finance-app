export type SubscriptionPayload = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export type SubscriptionKeys = {
  p256dh: string;
  auth: string;
};
