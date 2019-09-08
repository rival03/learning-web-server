const request = require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/daefae053f292f687d74518a71860aaf/'+ latitude + ','+ longitude 
    request({url ,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            const temp=body.currently.temperature;
            const precipitation=body.currently.precipProbability;
            callback(undefined,
                body.daily.data[0].summary+ "It is currently "+temp+" degrees out, There is a "+precipitation+"% chance of rain."
            )
        }
    })
}






module.exports=forecast