#/bin/bash
curl -vv -XPOST -d "{\"companyId\": \"0\"}" -H "Content-Type: Application/json" http://localhost:4000/api/users/0/punches
