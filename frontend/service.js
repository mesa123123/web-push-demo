//This function converts a 64base str   ing to an array that uses 8bit integers [i think]
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const saveSubscription = async subscription => {
    const SERVER_URL = 'http://localhost:4000/save-subscription'
    console.log(subscription)
    const response = await fetch(SERVER_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription),
    })
    return response.json()
}

self.addEventListener('activate', async () => {
    try {
        const applicationServerKey = urlB64ToUint8Array('BPGFUb5ld7NmrvkQWdArpkrx0T6zYxP83jkhltFs0QNyow5by0qiGoxdE7MWUWW4N7jUJKcH8A61Yer4-g-HaBM')
        const options = { applicationServerKey, userVisibleOnly: true}
        const subscription = await self.registration.pushManager.subscribe(options)
        const response = await saveSubscription(subscription)
        console.log(response)
        console.log(self.registration.pushManager)
        console.log(response)
    } catch (err) {
        console.log('Error', err.message)
    }
})

self.addEventListener('push', function(event) {

    if(event.data){
        console.log('Push Event', event.data.text())
    } else {
        console.log('Push Event Without Data')
    }
})