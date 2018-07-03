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

 function addLocation(location_name, location_address,city,zipcode, latitude,longitude,category_name){
     return db.query(`INSERT INTO Locations(location_name, location_address,city,zipcode, latitude,longitude,category_name)
         VALUES
         ('$1#','$2#','$3#',$4,$5,$6,'$7#') returning location_id`,[location_name, location_address,city,zipcode, latitude,longitude,category_name])
 }  


 function returnOnlyTen(){
     return db.query(`SELECT * FROM locations ORDER BY location_id LIMIT 10`);

 }
 
 function selectLocations(city){
     return db.query(`SELECT DISTINCT category_name FROM Locations WHERE city ILIKE '%$1#%'`, [city]);
 }

 function addLocationByCategoryName(category_name, city){
    return db.query(`SELECT  DISTINCT location_name,latitude, longitude FROM locations WHERE category_name ILIKE '%$1#%' AND city ILIKE '%$2#%'`,[category_name, city]);

 }
module.exports={
    getAll,
    getOne,
    addLocation,
    returnOnlyTen,
    selectLocations,
    addLocationByCategoryName

}
