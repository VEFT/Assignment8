#/bin/bash
curl -XGET http://localhost:4000/api/companies/0 | python -m json.tool
