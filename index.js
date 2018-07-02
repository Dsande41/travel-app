const dotenv = require('dotenv');
dotenv.config();

const request = require('request');
const fs= require('fs');
const filename='data.json';

const express=require('express');
const app=express();

let rp=require('request-promise');

const Travelapp = require('./db');
const database=require('./db');

const expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const static = express.static;
app.use(static('public'));

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
//   Travelapp.returnOnlyTen()
    //   .then((data)=>{
    //       console.log(data);
        //   res.render('Page to search and add items to the list', {
        res.render('homepage');
        //   locations: data                
        //   });
      })
     
  // res.send('this is the homepage');
// })

app.post('/',(req,res)=>{
    let zipcode=req.body.location;
    getGoogleLocation(zipcode)
        .then((response)=>{
            console.log(response);
            response=JSON.parse(response);
            let results=response.results;
            console.log(results);
            
            let lat=results[0].geometry.location.lat;
            let lng=results[0].geometry.location.lng;
            getData(lat,lng)
            .then(()=>{

            res.redirect('/newPage');
            })

        });
    });

app.post('/addLocation', (req, res)=>{
    res.send(req.body.id)

})

function getGoogleLocation(location){
    return rp({
    uri:`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyD5XrrqpfdzbKeFRmqQ1CpQuc0VzHxXZsU`
  
  })
}



function  getData(lat,long){
return rp({
  uri: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    ll: `${lat},${long}`,
  // ll: '44.7243,-77.0018',
    v: 20180323,
    limit: 10
  }
})
.then (function(err, res, data) {
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
              locations:data,
              results: [],
            
          });
          console.log(data);
        
         })
         .catch((error)=>{
             console.log(error);
         })
    });

      app.post('/newPage',(req,res)=>{
        //   console.log(req.body.location_name);
        //   Travelapp.selectLocations()
        //   .then((data)=>{
        //       console.log(data);
        //   Promise.all([Travelapp.selectLocations],Travelapp.addLocation)
        //   Travelapp.addLocationByCategoryName(req.body.location_name)
        //   .then((data)=>{
        //       console.log(data);
        //     //   res.render(`/${data.location_name}`);
        //     res.render('create-new-form-page',{
        //         locations:data,
        //         results: data
        //     });
              
        //   });
        Promise.all([Travelapp.selectLocations(), 
            Travelapp.addLocationByCategoryName(req.body.location_name)])
            .then(data => {
                res.render('create-new-form-page', {
                    locations: data[0],
                    results: data[1]
                })
            });
        });
   

// database.returnOnlyTen()
//   .then((results)=>{
//       console.log(results);
      
//   });




app.listen(9000,()=>{

});


