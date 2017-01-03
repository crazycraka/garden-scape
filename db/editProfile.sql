UPDATE garden
SET fname = $1,
	lname = $2,
    address = $3,
    email = $4,
    password = $5,
    currentService = $7
WHERE id = $6;