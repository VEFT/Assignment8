#/bin/bash
curl -vv -XPOST -d "{\"name\": \"Tempo\", \"description\": \"Creates a bunch of software shiz\", \"punchcard_lifetime\": 30}" -H "Content-Type: Application/json" -H "Authorization: ADMIN_TOKEN" http://localhost:4000/api/companies
