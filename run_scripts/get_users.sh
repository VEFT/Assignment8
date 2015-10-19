#/bin/bash
curl -vv -XGET http://localhost:4000/api/users | python -m json.tool
