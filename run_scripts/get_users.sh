#/bin/bash
curl -XGET http://localhost:4000/api/users | python -m json.tool
