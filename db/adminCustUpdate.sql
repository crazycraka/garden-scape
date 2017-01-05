UPDATE garden
SET fname = $1,
lname = $2,
address = $3,
email = $4,
currentservice = $5,
password = $6,
assignedtech = $7,
serviceday = $8,
servicetime = $9
WHERE id = $10