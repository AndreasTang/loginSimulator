const path = require('path')
const express = require('express')
// const Twitter = require('twitter-lite')
const cors = require('cors')
// const passport  = require('passport')
// const TwitterStrategy  = require('passport-twitter')
// const fetch = require('node-fetch')

const app = express()
const publicPath = path.join(__dirname, '..', 'build')
const port = process.env.PORT || 8080

// app.use(passport.initialize())

app.use(cors())

app.use(express.static(publicPath))

// passport.use(new TwitterStrategy({
//     consumerKey: process.env.TWITTER_API,
//     consumerSecret: process.env.TWITTER_API_SECRET,
//     callbackURL: process.env.NODE_ENV !== 'production' ? 'http://testtwitterlogin.com:3000' : 'https://loginsimulator.herokuapp.com'
// }, async (token, tokonSecret, profile, cb) => {
//     console.log(profile)
//     const userDate = await fetch('https://5ee7111052bb0500161fd346.mockapi.io/users', {
//         body: JSON.stringify({
//             id: profile._json.id_str,
//             name: profile._json.name,
//         }),
//         cache: 'no-cache',
//         headers: {
//             'content-type': 'application/json'
//         },
//         method: 'POST',
//     }).then((response) => {
//         console.log(response.status)
//         if (response.status === 201) {
//             return response.json()
//         } else {
//             throw new Error(response.statusText)
//         }
//     }).then((data) => {
//         console.log(data)
//         return data
//     }).catch((error) => {
//         console.log(error)
//         return null
//     })
//     cb(null, userDate)
// }))

// app.get('/auth/twitter', passport.authenticate('twitter', {failureRedirect: process.env.NODE_ENV !== 'production' ? 'http://testtwitterlogin.com:3000' : 'https://loginsimulator.herokuapp.com'}), 
//     (req, res) => {
//         res.status(200).send()
//     }
// )

// app.get('/getTwitterRequestToken', (req, res) => {

//     console.log(`Consumer Key: ${process.env.TWITTER_API}`)
//     console.log(`Consumer Secret: ${process.env.TWITTER_API_SECRET}`)

//     const client = new Twitter({
//         consumer_key: process.env.TWITTER_API,
//         consumer_secret: process.env.TWITTER_API_SECRET
//     })
//     try {
//         client.getRequestToken(process.env.NODE_ENV !== 'production' ? 'http://testtwitterlogin.com:3000' : 'https://loginsimulator.herokuapp.com')
//             .then((response) => {
//                 console.log(process.env.NODE_ENV !== 'production' ? 'http://testtwitterlogin.com:3000' : 'https://loginsimulator.herokuapp.com')
//                 console.log(`oAuth Token: ${response.oauth_token}`)
//                 console.log(`oAuth Secert: ${response.oauth_token_secret}`)
//                 res.status(200).send({
//                     url:`https://api.twitter.com/oauth/authenticate?oauth_token=${response.oauth_token}`
//                 })
//             })
//     } catch(error) {
//         res.status(500).send(error)
//     }


// })

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html' ))
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})