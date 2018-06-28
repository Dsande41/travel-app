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


INSERT INTO Locations(location_name, location_address, zipcode,city )
VALUES
    ('Atlanta pub','1223 north street', 40499,'Atlanta')
    
    ;
