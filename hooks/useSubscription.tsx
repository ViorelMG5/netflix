import payments from "@/lib/stripe";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!user) return;
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === "active" ||
            subscription.status == "trialing"
        )[0]
      );
    });
  }, []);
  return subscription;
}
