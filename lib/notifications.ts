import * as Notifications from 'expo-notifications';

export async function scheduleReminderAfterMinutes(minutes: number) {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('Benachrichtigungen nicht erlaubt!');
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Schon gelesen heute?',
      body: 'Nimm dir ein paar Minuten für dein Buch!',
      sound: true,
    },
    trigger: {
      seconds: minutes * 60,
      repeats: false,
    } as Notifications.TimeIntervalTriggerInput,
  });

  alert(`Erinnerung in ${minutes} Minuten gesetzt ✅`);
}
