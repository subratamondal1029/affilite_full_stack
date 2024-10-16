# API Documentation

## Base url: https://affiliate-backend-hhf8.onrender.com *Deployed server*
- open this link in browser its not giving `hello world` (api not working) then clone the repo on local system.

`instalation` :-
```bash
$ git clone https://github.com/subratamondal1029/affilite_full_stack
$ cd affilite_full_stack
$ cd frontend && npm install && npm run dev
# new terminal tab 
$ cd backend && npm install && npm run dev
```
- **backend url**: http://localhost:8080
    change the proxy in [`vite.config.js`](/frontend/vite.config.js) if need.
- **frontend url**: http://localhost:5173
---
### Endpoints:-

#### `/api/refferRedirect` *GET* :-

**Required Fields (query) :**

- `refferCode` ( string, required ): refferCode from url that you created. 
*baseUrl/redirect?=refferCode*

**Response**: 
```json
{
    "success": false,
    "isLogedin": false,
    "message": "Redirect to Login Page"
}
```
---
#### `/api/register` *POST* :-

**Required Fields (JSON):**

- `name` (string, required): The name of the user.
- `email` (string, required): The email of the user.
- `username` (string, required): The username or email of the user.
- `password` (string, required): The user's password.

**Response**:
```json
{
    "success": true,
    "message": "Registation Successfull!",
    "data": {
        "id": "c86ad2a1-7cae-4778-8c20-de92b1835f8a",
        "name": "subrata user",
        "username": "subratauser1029",
        "email": "subratauser@mail.com",
        "role": "user"
    }
}
```
---
#### `/api/login` *POST* :-

**Required Fields (JSON):**

- `username/email` (string, required): The username or email of the user.
- `password` (string, required): The user's password.

**Response:**
```json
{
    "success": true,
    "message": "Login Successfully!",
    "data": {
        "id": "c86ad2a1-7cae-4778-8c20-de92b1835f8a",
        "name": "subrata user",
        "username": "subratauser1029",
        "email": "subratauser@mail.com",
        "role": "user",
        "refferCode": "subrata1" //(if avilable) depend on landing url
    }
}
```

---
#### `/api/currentUser` *GET* :-

**Required Fields:** *null*

**Response:**
```json
{
    "success": true,
    "isLogedin": true,
    "data": {
        "id": "c86ad2a1-7cae-4778-8c20-de92b1835f8a",
        "name": "subrata user",
        "username": "subratauser1029",
        "email": "subratauser@mail.com",
        "role": "user",
        "refferCode": "subrata1" // (if avilable) depend on landing url
    }
}
```

---
#### `/api/allProducts` *GET* :-

**Required Fields:** *null*

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "product1",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sed repellendus odio dignissimos eius suscipit voluptate reiciendis similique veniam magni mollitia tempora perspiciatis ea temporibus optio vero consequuntur quis animi minima in, totam nam!",
            "price": 1999,
            "imageUrl": ""
        }
    ]
}
```

---
#### `/api/product` *GET* :-

**Required Fields (query):** 
- `productId` (string, required): The Id of the product

*example url: http://localhost:8080/api/getProduct?productId=1*

**Response:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "product1",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sed repellendus odio dignissimos eius suscipit voluptate reiciendis similique veniam magni mollitia tempora perspiciatis ea temporibus optio vero consequuntur quis animi minima in, totam nam!",
        "price": 1999,
        "imageUrl": ""
    }
}
```

---
#### `/api/buyProduct` *POST* :-

**Required Fields (JSON):** 
- `productId` (string, required): The Id of the product 
- `userId` (string, required): Id of the current logedin user
- `refferCode` (string, optional): refferCode from current user's Data  


**Response:**
```json
{
    "success": true,
    "productDetail": {
        "id": 1,
        "name": "product1",
        "price": 1999
    }
}
```

