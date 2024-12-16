import { serverurl } from "../config";

export const subscribeToPushNotifications = async () => {
  if ("Notification" in window && "serviceWorker" in navigator) {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "denied") {
        console.error("The user explicitly denied the permission request.");
        return;
      }
      if (permission === "granted") {
        console.info("The user accepted the permission request.");
      }

      const registration = await navigator.serviceWorker.ready;
      const subscribed = await registration.pushManager.getSubscription();
      
      if (subscribed) {
        console.info("User is already subscribed.");
        return;
      }

      const vapidPublicKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;
      if (!vapidPublicKey) {
        return;
      }

      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      await saveSubscriptionToBackend(subscription);
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
    }
  } else {
    console.error("Push notifications or service worker are not supported");
  }
};

const saveSubscriptionToBackend = async (subscription: PushSubscription) => {
  try {
    const response = await fetch(`${serverurl}/notification/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscription }),
    });

    if (response.ok) {
      console.log("Subscription saved successfully!");
    } else {
      const error = await response.text();
      console.error("Error saving subscription:", error);
    }
  } catch (error) {
    console.error("Error sending subscription to backend:", error);
  }
};

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
