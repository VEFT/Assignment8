#/bin/bash
curl -vv -XPOST -d "{\"name\": \"Daniel Benediktsson\", \"email\": \"danielb13@ru.is\"}" -H "Content-Type: Application/json" http://localhost:4000/api/users
