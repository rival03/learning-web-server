const path =require('path')
const express =require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port = process.env.PORT || 3000

// define path for express config
const publiDir = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setting up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publiDir))

app.get('',(req,res)=>{
    res.render('index',
       {
          title:'weather App',
          name:'The_Rival03'
        }
    )
})

app.get('/about',(req,res)=>{
    res.render('about',
       {
          title:'about me',
          name:'The_Rival03'
        }
    )
})

app.get('/help',(req,res)=>{
    res.render('help',
       {
          message:'learn something',
          title:'Help',
          name:'The_Rival03'
        }
    )
})

app.get('/Weather',(req,res)=>{
    const address = req.query.address
    if(!address){

        return res.send(
            {
              error:"must have an input"
            }
        )
        
    }else{
        geocode(address,(error,{latitude,longitude,location}={})=>{

            if(error){
                return res.send({ error})
            }
        
            
            forecast(latitude, longitude, (error, forecastdata) => {
                if(error){
                    return res.send({error})
                }
        
                res.send({
                    location,
                    forecast:forecastdata,
                    address:address
                })
               
            })
        })
       

    }
    
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query.search)

    res.send({
        products:{}
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404help',{
        title:'404 Help',
        name:'The_Rival03',
        message:'Help Article not Found'
    })
})


app.get('*',(req,res)=>{
    res.render('page404',{
        title:'404',
        name:'The_Rival03',
        message:'Page not found'
    })
})


app.listen(port,()=>{
    console.log('server is up on port '+port+'.')
})