#### Create `.env` file in `backend` folder and add these fields:

```
MONGO_CONNECTION_URI=your-mongodb-url

PORT=3000

JWT_SECRET=secret-key
```

#### JWT:

- sign -> first time login - we use jwt.sign(credential, Secret) to generate a new token
- decode -> anyone can decode token from jwt debugger
- verify -> jwt + Secret
