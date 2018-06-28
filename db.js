const pgp =require('pg-promise')();
const cn ={
    host: 'localhost',
    port:5432,
    database: 'travel-app-db',
    user: 'postgres',
    password:''

};

const db =pgp(cn);


// get all the from the Venues table

function getAll(){
    return db.any('SELECT * FROM Locations');
}

// get one item from the Venues table by venue_id

function getOne(location_id){

    return db.oneOrNone('SELECT * FROM Locations WHERE id = $1', [location_id]);
}

 function addLocation(location_name,location_address,zipCode,city){
     return db.query(`INSERT INTO Locations(location_name, location_address, zipcode,city )
     
    VALUES
         ('$1#','$2#',$3, '$4#') `,[location_name,location_address,zipCode,city])
 }

 
module.exports={
    getAll,
    getOne,
    addLocation

}
