  const dotenv = require('dotenv');
  dotenv.config();

  const request = require('request');
  const fs= require('fs');
  const filename='data.json';

  request({
    url: 'https://api.foursquare.com/v2/venues/explore',
    method: 'GET',
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      ll: '44.7243,-77.0018',
      v: '20180323',
      limit: 50
    }
  }, function(err, res, body) {
    if (err) {                                                              
      console.log('error');
    } else {
    //   console.log(body.response);
      fs.writeFile(filename,body,(error)=>{
        if(error){
        
            // console.log(error.message);
            return;
        }

    
      })
      
    }
  });

  