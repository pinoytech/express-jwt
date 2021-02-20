## Sample app to simulate logging in, logging out and refreshing token with JWT

### Protected route

```
GET http://localhost:3000/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpYXQiOjE2MTM4MDk1MjgsImV4cCI6MTYxMzgwOTU1OH0.wcbhlb1vrxkO4qAGMG39XXV04pqardGh-RBBNg5_7WE
```

### Logout

```
DELETE http://localhost:3000/logout
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpYXQiOjE2MTM4MDk0ODR9.1ZGj2oQ7ZKwTcAbLLBbP6J1UeYaGrKQc2g3RqD4-pIc"
}
```

### Login

```
POST http://localhost:3000/login
Content-Type: application/json

{
  "username": "mike"
}
```

### Refresh Token

```
POST http://localhost:3000/token
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpYXQiOjE2MTM4MDk0ODR9.1ZGj2oQ7ZKwTcAbLLBbP6J1UeYaGrKQc2g3RqD4-pIc"
}
```
