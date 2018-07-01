const dotenv = require('dotenv');
dotenv.config();

const request = require('request');
const fs= require('fs');
const filename='data.json';

const express=require('express');
const app=express();


// const geocoder =require('geocoder');
// const https= require('https');

const Travelapp = require('./db');
const database=require('./db');

const expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const static = express.static;
app.use(static('public'));

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


// $('#search-bar').submit(function(event){
//     event.preventDefault();
//     if(!lat){
//         navigator.geolocation.getCurrentPosition(getLocation);
//     }else{
//         getData(lat,lng);
//     }

// })

// function getLocation(location){
//     lat=location.coords.latitude;
//     lng=location.coords.longitude;
// }

// function getLocation(){
//     if(navigator.geolocation){

//         navigator.geolocation.getCurrentPosition();
//     }
// }

// function geocode(event){

//     https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyD5XrrqpfdzbKeFRmqQ1CpQuc0VzHxXZsU`,(resp))

// }

app.get('/', (req, res)=>{
  Travelapp.returnOnlyTen()
      .then((data)=>{
          console.log(data);
          res.render('Page to search and add items to the list', {
          locations: data                
          });
      })
      .catch((error)=>{
          console.log(error);
      })
  // res.send('this is the homepage');
})


app.post('/addLocation', (req, res)=>{
    res.send(req.body.id)

})

// function getSearch(gs){
//         https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyD5XrrqpfdzbKeFRmqQ1CpQuc0VzHxXZsU`, function(res){
//             var jsonFile='';
//             res.on('data', function(otherdata){
//                 jsonFile+=otherdata;
//             })
//         });
//     }


function  getData(lat,long){
request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    ll: `${lat},${long}`,
  // ll: '44.7243,-77.0018',
    v: 20180323,
    limit: 10
  }
}, function(err, res, data) {
// },function(err, res,body){
  if (err) {                                                              
    console.log('error');

  } else {
      // console.log(data);
    //   const datasource = require('./data.json');
      let otherdata= JSON.parse(data);

    //   console.log(data);
      
      for(let i=0; i<otherdata.response.groups[0].items.length;i++){
          let location_name= otherdata.response.groups[0].items[i].venue.name || '';
          let latitude=otherdata.response.groups[0].items[i].venue.location.lat || 0;
          let longitude=otherdata.response.groups[0].items[i].venue.location.lng || 0;
          let location_address=otherdata.response.groups[0].items[i].venue.location.address || '';
          let city=otherdata.response.groups[0].items[i].venue.location.city || '';
          let zipCode=otherdata.response.groups[0].items[i].venue.location.postalCode || 0;
          let category_name=otherdata.response.groups[0].items[i].venue.categories[0].pluralName || '';
        
        
          database.addLocation(location_name, location_address,city,zipCode,latitude,longitude,category_name);
            }
          }
      })
  }

      app.get('/newPage',(req, res)=>{
          console.log('This is the new route for the form');
          Travelapp.selectLocations()
          .then((data)=>{
              console.log(data);
          res.render('create-new-form-page',{
              database:data
          });
          console.log(data);
        
         })
         .catch((error)=>{
             console.log(error);
         })
    });

      app.post('/newPage',(req,res)=>{
          console.log(req.body);
          Travelapp.addLocation(req.body.location_name)
          .then((data)=>{
              res.redirect(`/${data.location_name}`);
          });
      });

    // grab all the categories
    // then console.log those categories
  //   console.log(body.response);
  //   fs.writeFile(filename,body,(error)=>{
  //     if(error){
      
  //         // console.log(error.message);
  //         return;
  //     }

  
  //   })
    
//     }
//   });

database.returnOnlyTen()
  .then((results)=>{
      console.log(results);
      
  });
 
// getData(25.718301364039064, -71.99192996850243);



app.listen(7000,()=>{

});


