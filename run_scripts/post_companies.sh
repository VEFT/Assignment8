#/bin/bash
curl -vv -XPOST -d "{\"name\": \"Tempo\", \"description\": \"Creates a bunch of software shiz\", \"punchcard_lifetime\": \"30\"}" -H "Content-Type: Application/json" http://localhost:4000/api/companies
