  const dotenv = require('dotenv');
  dotenv.config();

  const request = require('request');
  const fs= require('fs');
  const filename='data.json';

  const express=require('express');
  const app=express();

  const Travelapp = require('./db')

  const database=require('./db');

function  getData(lat,long){
  request({
    url: 'https://api.foursquare.com/v2/venues/explore',
    method: 'GET',
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      ll: `${lat},${long}`,
      v: 20180323,
      limit: 50
    }
  }, function(err, res, data) {
    if (err) {                                                              
      console.log('error');

    } else {
        console.log(data);
        data= JSON.parse(data);
        for(let i=0; i<data.response.groups[0].items.length;i++){
            let location_name= data.response.groups[0].items[i].venue.name || '';
            let latitude=data.response.groups[0].items[i].venue.location.lat;
            let longitude=data.response.groups[0].items[i].venue.location.lng;
            let location_address=data.response.groups[0].items[i].venue.location.address || '';
            let city=data.response.groups[0].items[i].venue.location.city || '';
            let zipCode=data.response.groups[0].items[i].venue.location.postalCode || 0;
          
            database.addLocation(location_name, location_address,zipCode, city);
        }

    //   console.log(body.response);
    //   fs.writeFile(filename,body,(error)=>{
    //     if(error){
        
    //         // console.log(error.message);
    //         return;
    //     }

    
    //   })
      
    }
  });
}
 getData(40.718301364039064, -73.99192996850243);
  