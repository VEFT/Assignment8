#/bin/bash
curl -vv -XPOST -d "{\"company_id\": 0, \"user_id\": 5}" -H "Content-Type: Application/json" -H "Authorization: tokentoken" http://localhost:4000/api/punchcards/5625672e1a62e67f070f8ffd
