 INSERT INTO Locations(location_name, location_address,city,zipcode, latitude,longitude,category_name )
VALUES
    ('Atlanta pub','1223 north street','Atlanta', 40499,77.1234,-43.66543,'restaurant'),
    ('Central park','1223 South street','portland', 40488,77.1234,-23.66543,'park');

INSERT INTO Users(email_address,user_name)
VALUES
    ('User@gmail.com', 'alana'),
    ('user2@yahoo.con', 'alex');


INSERT INTO Itinerary(user_id, location_id, order_item)
VALUES
	(2,3,1),
	(2,5,2);