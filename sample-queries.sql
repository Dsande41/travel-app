-- can do similar operation as I did for Locations with Users and Itinerary
-- don't forget to change the name of the table

SELECT * FROM Locations;

SELECT * FROM Locations
WHERE location_id=1;

SELECT * FROM Locations
WHERE location_name='Kennebec Lake';

UPDATE Locations
SET location_name = 'Kennebec Lake'
WHERE location_id=1;


DELETE FROM Locations
WHERE location_id=8;


INSERT INTO Locations(location_name, location_address,city,zipcode, latitude,longitude,category_name )
VALUES
    ('Atlanta pub','1223 north street','Atlanta', 40499,77.1234,-43.66543,'restaurant'),
    ('Central park','1223 South street','portland', 40488,77.1234,-23.66543,'park');

    
SELECT * FROM locations
ORDER BY location_name 
LIMIT 10;

INSERT INTO Users(email_address,user_name)
VALUES
    ('User@gmail.com', 'alana'),
    ('user2@yahoo.con', 'alex');


SELECT * FROM Users;

SELECT * FROM Users
WHERE user_id=1;


SELECT * FROM Users
WHERE email_address='User@gmail.com';


SELECT * FROM Users
WHERE user_name='alex';

UPDATE Users
SET email_address = 'test@gmail.com'
WHERE user_id=3;

INSERT INTO Itinerary(user_id, location_id, order_item)
VALUES
	(2,3,1),
	(2,5,2);

-- update Itinerary to the order_item having a value
-- and do a join
UPDATE Itinerary
SET order_item=6
FROM Users,Locations
WHERE Users.user_id=Locations.location_id;

