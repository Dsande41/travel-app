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


SELECT * FROM locations
ORDER BY location_name 
LIMIT 10;


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

-- update Itinerary to the order_item having a value
-- and do a join
UPDATE Itinerary
SET order_item=6
FROM Users,Locations
WHERE Users.user_id=Locations.location_id;

-- select all category names from the Locations table

SELECT DISTINCT category_name FROM Locations;