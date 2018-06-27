const data= require('./data.json');

const name= data.response.groups[0].items[0].venue.name;
console.log(name);

const latitude=data.response.groups[0].items[0].venue.location.lat;
console.log(latitude);

const longitude=data.response.groups[0].items[0].venue.location.lng;
console.log(longitude);

const city=data.response.groups[0].items[0].venue.location.city;
console.log(city);
// not all locations have a zipcode;
const zip=data.response.groups[0].items[2].venue.location.postalCode;
console.log(zip);


for( let i=0; i<data.response.groups[0].items.length;i++){
    let item=data.response.groups[0].items[i].venue.name;
    console.log(item);
}
module.exports=data;