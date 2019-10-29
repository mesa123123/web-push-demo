console.log('JS is working!')

const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker Not Supported!')
    }
    if (!('PushManager' in window)) {
        throw new Error('No Push API Support!')
    }
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js')
    console.log(swRegistration)
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission()
    console.log(Notification.permission)
    if(permission !== 'granted') {
        throw new Error('Permission not granted for Notifications')
    }
}

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body: body
    }
    swRegistration.showNotification(title, options)
}

const main = async () => {
    check()
    const swRegistration = await registerServiceWorker()
    const permission = await requestNotificationPermission()
    console.log(permission)
    showLocalNotification('This is the title', 'this is the message', swRegistration)
}