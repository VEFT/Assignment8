#/bin/bash
curl -vv -XPOST -d "{\"name\": \"Daniel Benediktsson\", \"token\": \"tokentoken\", \"age\": 20, \"gender\": \"f\"}" -H "Content-Type: Application/json" http://localhost:4000/api/users
