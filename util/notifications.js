import { Notifications, Permissions } from 'expo'
import API from '../dal/api'

const NOTIFICATION_HOUR = 17
const NOTIFICATION_MIN = 0

export function clearLocalNotification () {
  return API.clearNotifications()
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Complete a Quizz',
    body: "👋 Please remember to complete at least one quizz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  API.getNotification()
    .then(JSON.parse)
    .then(() => {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(NOTIFICATION_HOUR)
            tomorrow.setMinutes(NOTIFICATION_MIN)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            )

            API.setNotification(JSON.stringify(true))
          }
        })
    })
}