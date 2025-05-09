import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const setNotificationsHandler = () => Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,  
    }),
});

async function registerForPushNotifications() {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
        alert("Permissão negada para notificações!");
        return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    console.log(`Token gerado: ${token}`);

    return token;
}

export { setNotificationsHandler, registerForPushNotifications };