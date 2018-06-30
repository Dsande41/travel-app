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