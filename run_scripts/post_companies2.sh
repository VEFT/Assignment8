#/bin/bash
curl -vv -XPOST -d "{\"name\": \"Advania\", \"punchCount\": \"55\"}" -H "Content-Type: Application/json" http://localhost:4000/api/companies
