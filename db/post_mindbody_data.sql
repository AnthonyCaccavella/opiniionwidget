insert into integration
(name, bid, apikey, sourcename, sourcepass, siteid, username, userpassword, locationid, integrationtype)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;