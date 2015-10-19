#/bin/bash
curl -vv -XPOST -d "{\"name\": 15, \"description\": \"\", \"punchcard_lifetime\": 30}" -H "Content-Type: Application/json" -H "Authorization: ADMIN_TOKEN" http://localhost:4000/api/companies | python -m json.tool
