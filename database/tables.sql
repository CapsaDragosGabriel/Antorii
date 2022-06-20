CREATE TABLE consumers (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    phone_number varchar(15) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    pass varchar(50) NOT NULL,
    county varchar(60) NOT NULL,
    city varchar(60) NOT NULL,
    localization varchar(100) NOT NULL,
    token varchar(50),
    PRIMARY KEY (id)
);

-------------------------------------------------

CREATE TABLE providers (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    phone_number varchar(15) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    pass varchar(50) NOT NULL,
    city varchar(60) NOT NULL,
    token varchar(50),
    service varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    phone_number varchar(15) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    pass varchar(50) NOT NULL,
    city varchar(60) NOT NULL,
    county varchar(60),
    localization varchar(100),
    token varchar(50),
    created_token_time datetime,
    service varchar(50),
    PRIMARY KEY (id)
);

-------------------------------------------------

CREATE TABLE ride_shares (
    id int NOT NULL AUTO_INCREMENT,
    consumerID int NOT NULL,
    providerID int,
    start varchar(100) NOT NULL,
    finish varchar(100) NOT NULL,
    status varchar(100) NOT NULL,
    estimated varchar(5) NOT NULL,
    feedback varchar(1000),
    FOREIGN KEY (consumerID) REFERENCES users (id),
    FOREIGN KEY (providerID) REFERENCES users (id),
    PRIMARY KEY (id)
);

-------------------------------------------------

CREATE TABLE restaurants (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL UNIQUE,
    photo MEDIUMTEXT NOT NULL,
    PRIMARY KEY (id)
);

-------------------------------------------------

CREATE TABLE items (
    id int NOT NULL AUTO_INCREMENT,
    restaurantID int NOT NULL,
    name varchar(50) NOT NULL UNIQUE,
    description varchar(300) NOT NULL,
    price  decimal(5,2) ,
    FOREIGN KEY (restaurantID) REFERENCES restaurants (id),
    PRIMARY KEY (id)
);

-------------------------------------------------
CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    restaurantID int NOT NULL,
    address varchar(100) NOT NULL,
    status varchar(100) NOT NULL,
    estimated varchar(5) NOT NULL,
    feedback_restaurant varchar(1000),
    feedback_provider varchar(1000),
    consumerID int NOT NULL,
    providerID int NOT NULL,
    FOREIGN KEY (restaurantID) REFERENCES restaurants (id),
    FOREIGN KEY (consumerID) REFERENCES users (id),
    FOREIGN KEY (providerID) REFERENCES users (id),
    PRIMARY KEY (id)
);

CREATE TABLE ordered_items (
    id int NOT NULL AUTO_INCREMENT,
    orderID int NOT NULL,
    itemID int NOT NULL,
    quantity int NOT NULL,
    FOREIGN KEY (orderID) REFERENCES orders (id),
    FOREIGN KEY (itemID) REFERENCES items (id),
    PRIMARY KEY (id)
);


---------

