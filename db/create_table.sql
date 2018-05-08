create table if not exists integration (
    id serial primary key,
    name varchar(180),
    BID varchar(10),
    APIKEY varchar(180),
    datapoint1 text,
    datapoint2 text,
    datapoint3 text,
    datapoint4 text,
    datapoint5 text,
    datapoint6 text,
    datapoint7 text,
)