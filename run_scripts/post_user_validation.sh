#/bin/bash
curl -vv -XPOST -d "{\"name\": \"\", \"token\": \"tokentoken\", \"age\": 20, \"gender\": \"f\"}" -H "Content-Type: Application/json" -H "Authorization: ADMIN_TOKEN" http://localhost:4000/api/users
