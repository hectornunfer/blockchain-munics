### Container IPFS
Note: all the following command require to be run in the path of the folder .\lab2\ejercicio_2.

1. Replace the respective folders with the statics ones based on your OS and run the command

docker run -d --name lab2_ipfs_host -v C:\Users\Work\Documents\udc\cripto\bc_udc_labs\lab2\ejercicio_2\node_container_ipfs\export:/export -v C:\Users\Work\Documents\udc\cripto\bc_udc_labs\lab2\ejercicio_2\node_container_ipfs\data\ipfs:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo

2. Allow all permissions. (risky on production)

docker exec lab2_ipfs_host ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"*\"]'
docker exec lab2_ipfs_host ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '[\"GET\", \"POST\"]'
docker exec lab2_ipfs_host ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '[\"Authorization\"]'
docker exec lab2_ipfs_host ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '[\"Location\"]'
docker exec lab2_ipfs_host ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '[\"true\"]'

3. Restart container to apply the effects of permissions.

### Local FrontEnd application to load only CSV files
Note: remember to change the addresses of your wallet in the file lab2\ejercicio_2\node_sender_metereologia\src\contracts\src\addresses.js

1. Go to folder node_sender_metereologia

2. Run `npm install` to install all the required dependencies

3. Deploy the application with `npm start`

4. Due to some CORS conflicts, go to the application with http://127.0.0.1:3000/ instead of using the domain localhost
