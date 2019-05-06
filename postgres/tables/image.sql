BEGIN TRANSACTION;

CREATE TABLE IMAGE
(
    id serial PRIMARY KEY,
    title varchar(250),
    low_url varchar(250),
    medium_url varchar(250),
    high_url varchar(250)
);

COMMIT;