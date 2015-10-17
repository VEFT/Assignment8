#/bin/bash
curl -vv -XPOST -d "{\"name\": \"Tempo\", \"punchCount\": \"30\"}" -H "Content-Type: Application/json" http://localhost:4000/api/companies
