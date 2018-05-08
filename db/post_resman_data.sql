insert into integration
(name, bid, apikey, ipid, api, datapoint1, pid, integrationtype)
values($1, $2, $3, $4, $5, $6, $7, $8)
returning *;
