//Handle imports
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webPush = require('web-push')
const vapidKeys = require('../vapid.json')
//Setup application
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 4000

//Set up webpush
webPush.setVapidDetails(
    'mailto: peter.bowman@db.co.nz',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
//setup Push Notification
const sendNotification = (subscription, dataToSend='') => {
    webPush.sendNotification(subscription, dataToSend).catch(error => { console.log('Damn it: ', error.message)})
}

//Server Routes Defined
app.get('/', (req, res) => res.send('Hello World!'))

//Setup Database Methods
const dummyDb = {subscription: null}

const saveToDatabase = async subscription => {
    dummyDb.subscription = subscription
}

app.post('/save-subscription', async (req, res) => {
    const subscription = req.body
    await saveToDatabase(subscription)
    console.log(subscription)
    res.json({message: 'success'})
})

app.get('/send-notification', (req, res) => {
    const subscription = dummyDb.subscription
    const message = 'hello world'
    sendNotification(subscription, message)
    res.json({message: dummyDb.subscription})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))