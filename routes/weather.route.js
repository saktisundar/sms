const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get("/:place", function(req, res){
    let place = req.params.place
    let apiKey = process.env.WEATHER_APP_API_KEY
    let address = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apiKey

    axios.get(address)
    .then(function (response) {
        res.status(200).send(response.data.main)
    })
    .catch(function (error) {
       res.status(400).send("Unable to get the weather information")
    })
})


module.exports = router