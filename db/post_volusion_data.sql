insert into integration
(name, bid, apikey, datapoint1, datapoint2, sourcepass, datapoint3, datapoint4, datapoint5, datapoint6, integrationtype)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *;