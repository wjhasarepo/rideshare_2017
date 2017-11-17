create table airport_positions {
  airport_id integer not null primary key,
  airport_name varchar(255),
  airport_lat decimal,
  airport_lng decimal,
  created_at datetime not null,
  updated_at datetime not null
};



create table device_users
(
  user_id integer not null auto_increment primary key,
  first_name varchar(128),
  last_name varchar(128),
  phone_number varchar(128),
  email varchar(128),
  encrypted_password varchar(128) default '',
  sign_in_count integer default 0,
  current_sign_in_at datetime,
  last_sign_in_at datetime,
  current_sign_in_ip varchar(128),
  last_sign_in_ip varchar(128),
  failed_attempts integer default 0,
  locked_at datetime,
  unlock_token varchar(128),
  token varchar(128),
  created_at datetime,
  updated_at datetime
);

create unique index id on device_users (user_id, email)



create table users_role
(
  role_id integer not null auto_increment primary key,
  user_id integer not null,
  type varchar(128),
  created_at datetime,
  updated_at datetime,
  foreign key (user_id) references device_users(user_id) on delete cascade
);

add_index device_users_roles, [user_id, role_id], name: index_device_users_roles_on_user_id_and_role_id
add_index roles, [name, resource_type, resource_id], name: index_roles_on_name_and_resource_type_and_resource_id
add_index roles, [name], name: index_roles_on_name



create table cars
(
  user_id integer not null,
  car_id integer not null auto_increment primary key,
  year integer,
  make varchar(128),
  model varchar(128),
  color varchar(128),
  created_at datetime,
  updated_at datetime,
  foreign key (user_id) references device_users(user_id) on delete cascade
);

add_index cars, [user_id], name: index_cars_on_user_id



create table users_positions {
	user_id integer not null primary key,
  latitude decimal(16, 12),  
  longitude decimal(16, 12),
  created_at datetime not null,
  updated_at datetime not null,
	foreign key (user_id) references device_users(user_id) on delete cascade
}

add_index positions, [user_id], name: index_positions_on_user_id



create table rides_offered
(
ride_offer_id integer not null primary key auto_increment,
user_id integer,
offer_time datetime,
start_address varchar(128),
start_lat decimal(16, 12),
start_lng decimal(16, 12),
destination_address varchar(128),
destination_lat decimal(16, 12),
destination_lng decimal(16, 12),
available_passengers integer,
available_bags integer,
flexible_value integer,
created_at datetime,
updated_at datetime,
foreign key (user_id) references device_users(user_id) on delete cascade
);
-- airport_id integer not null,
-- car_id integer,
-- foreign key (airport_id) references airport(airport_id) on delete cascade

add_index rides_offered, [car_id], name: index_rides_offered_on_car_id
  


create table rides_requested
(
ride_request_id integer not null primary key auto_increment,
user_id integer,
passengers integer,
bags integer,
request_time datetime,
start_address varchar(128),
start_lat decimal(16, 12),
start_lng decimal(16, 12),
destination_address varchar(128),
destination_lat decimal(16, 12),
destination_lng decimal(16, 12),
created_at datetime,
updated_at datetime,
foreign key (user_id) references device_users(user_id) on delete cascade
);

-- airport_id integer,
-- foreign key (airport_id) references airport(airport_id) on delete cascade

create table rides_matched
(
ride_match_id integer not null primary key auto_increment,
ride_request_id integer not null,
ride_offer_id integer not null,
created_at datetime,
updated_at datetime,
foreign key (ride_offer_id) references rides_offered(ride_offer_id) on delete cascade,
foreign key (ride_request_id) references rides_requested(ride_request_id) on delete cascade
);
  
add_index ride_matches, [ride_offered_id], name: index_ride_matches_on_ride_offered_id
add_index ride_matches, [ride_requested_id], name: index_ride_matches_on_ride_requested_id



create table rides_transactions
(
ride_transaction_id integer not null primary key auto_increment,
ride_match_id integer not null,
status varchar(255),
created_at datetime,
updated_at datetime,
foreign key (ride_match_id) references rides_matched(ride_match_id) on delete cascade
);
  
add_index ride_transactions, [ride_match_id], name: index_ride_transactions_on_ride_match_id
  


create table transaction_reviews {
  ride_transaction_id integer not null primary key,
	passenger_id integer not null primary key,
	driver_id integer not null primary key,
  rating integer,   
  comment text,
  created_at datetime not null,
  updated_at datetime not null
	foreign key (ride_match_id) references ride_matches(ride_transaction_id) on delete cascade
}
  
add_index transaction_reviews, [ride_transaction_id], name: index_transaction_reviews_on_ride_transaction_id



-------------------------
-- sample testing data --
-------------------------

----------------------------------------------------------
insert into device_users
(user_id,first_name,last_name,phone_number,email,encrypted_password,sign_in_count,current_sign_in_at,last_sign_in_at,current_sign_in_ip,last_sign_in_ip,failed_attempts,locked_at,unlock_token,token,created_at,updated_at)
values
(1,'wayne','jiao','1234567890','waynejiao@gmail.com','$2a$10$3/.gvJXfK6rhC6z2jRn6xOPzemRC8gTgBuoZxf/pP6SwnfPjOsL3K',0,'1000-01-01 00:00:00','1000-01-01 00:00:00','null','null',0,'1000-01-01 00:00:00','null','null','1000-01-01 00:00:00','1000-01-01 00:00:00');
----------------------------------------------------------



----------------------------------------------------------
-- insert into rides_requested
-- (ride_request_id,user_id,passengers,bags,request_time,start_address,start_lat,start_lng,destination_address,destination_lat,destination_lng,created_at,updated_at)
-- values
-- (null,4,2,2,'2017-05-01 16:00:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.3956638,-97.59625319999999,'1320 W Lindsey St, Norman, OK 73069, USA','35.203349','-97.461788','1000-01-01 00:00:00','1000-01-01 00:00:00');

insert into rides_requested
(ride_request_id,user_id,passengers,bags,request_time,start_address,start_lat,start_lng,destination_address,destination_lat,destination_lng,created_at,updated_at)
values
(null,1,2,2,'2017-05-01 16:10:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.3956638,-97.59625319999999,'1320 W Lindsey St, Norman, OK 73069, USA','35.203349','-97.461788','1000-01-01 00:00:00','1000-01-01 00:00:00');
-----------------------------------------------------------



----------------------------------------------------------
insert into rides_offered
(ride_offer_id,user_id,offer_time,start_address,start_lat,start_lng,destination_address,destination_lat,destination_lng,available_passengers,available_bags,flexible_value,created_at,updated_at)
values
(null,2,'2017-05-01 16:00:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.3956638,-97.59625319999999,'660 Parrington Oval, Norman, OK 73019, USA',35.2091576,-97.44569340000001,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00');

insert into rides_offered
(ride_offer_id,user_id,offer_time,start_address,start_lat,start_lng,destination_address,destination_lat,destination_lng,available_passengers,available_bags,flexible_value,created_at,updated_at)
values
(null,3,'2017-05-01 16:10:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.3956638,-97.59625319999999,'660 Parrington Oval, Norman, OK 73019, USA',35.2091576,-97.44569340000001,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00');

insert into rides_offered
(ride_offer_id,user_id,offer_time,start_address,start_lat,start_lng,destination_address,destination_lat,destination_lng,available_passengers,available_bags,flexible_value,created_at,updated_at)
values
(null,4,'2017-05-01 16:20:00','7100 Terminal Dr, Oklahoma City, OK 73159, USA',35.3956638,-97.59625319999999,'1320 W Lindsey St, Norman, OK 73069, USA',35.2091576,-97.44569340000001,2,2,15,'1000-01-01 00:00:00','1000-01-01 00:00:00');
----------------------------------------------------------
