CREATE TABLE Locations(
    location_id serial primary key,
    location_name varchar(45),
    location_address varchar(45),
    zipCode varchar(45),
    city varchar(45),
    latitude decimal(10,8),
    longitude decimal(10,8),
    category_name varchar(200)
 );


 CREATE TABLE Users(
     user_id serial primary key,
     email_address varchar(50),
     user_name varchar(200)
 );

 CREATE TABLE Itinerary(
    user_id integer REFERENCES Users(user_id),
    location_id integer REFERENCES Locations(location_id), 
    order_item integer
 );