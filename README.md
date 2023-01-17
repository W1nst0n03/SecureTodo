- Theo Siemens-Rhodes - GitHub: W1nst0n03 - LinkedIn: https://www.linkedin.com/in/theo-siemens-rhodes/

# To use this locally:
- You will need and Node.js locally and an account with both Firebase and MongoDB
- Create a .env in the api directory containing:
  - The link to your MongoDB Database(DB_CONNECTION)
- Create a .env.local in the client directory containing: 
apiKey: "AIzaSyDAp9JY5zuCBMp9S6sZ2_xrqwNsRsmJ5Hk",
  authDomain: "todoapp-auth-b9c9c.firebaseapp.com",
  projectId: "todoapp-auth-b9c9c",
  storageBucket: "todoapp-auth-b9c9c.appspot.com",
  messagingSenderId: "747020026960",
  appId:
  - Firebase: apiKey(REACT_APP_APIKEY), authDomain(REACT_APP_AUTHDOMAIN), projectID(REACT_APP_PROJECTID), storageBucket(REACT_APP_STORAGEBUCKET),
  messageSenderId(REACT_APP_MESSAGINGSENDERID), appId(REACT_APP_APPID)
  - Api Connection Link(REACT_APP_API_BASE) - default is "http://localhost:3001/" if the api is hosted on port 3001
 - run "npm i" to install node_modules. The client directory is there but can be ignored if you wish.
 - To connect run npm start in ./api to start the database api (console should say "Server Started on port 3001" and "Connected to MongoDB" if the connection is successful) and run npm start in ./client to start the react app
 - By default the webapp should be hosted on "http://localhost:3000/"
