import React from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
  channelId: 'channel-id',
  channelName: 'My Channel',
  channelDescription: undefined,
  playSound: false,
  soundName: 'default',
  importance: 4,
  vibrate: true,
});

const NotificationController = props => {
  React.useEffect(() => {
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        channelId: true,
        vibrate: true,
      });
    });
    return unsubscribe;
  }, []);
  return null;
};

export default NotificationController;
