#/bin/bash
curl -XGET http://localhost:4000/api/companies | python -m json.tool
