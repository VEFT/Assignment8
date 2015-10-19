#/bin/bash
curl -vv -XGET http://localhost:4000/api/companies | python -m json.tool
