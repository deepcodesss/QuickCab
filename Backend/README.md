# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Requires user details in the request body. Returns a JWT token and user information upon successful registration.

## Request Body

Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Responses

- **201 Created**
  - Registration successful. Returns a JSON object with a JWT token and user data.
  - Example:
    ```
    {
      "token": "<jwt_token>",
      "user": { ...user fields... }
    }
    ```
- **400 Bad Request**
  - Validation failed or user already exists. Returns an error message or validation errors.
  - Example:
    ```
    { "errors": [ ... ] }
    ```
    or
    ```
    { "message": "User already exist" }
    ```

## Notes
- All required fields must be provided in the correct format.
- The email must be unique.
- Passwords are securely hashed before storage.

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password. Returns a JWT token and user information upon successful login.

## Request Body

Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Responses

- **200 OK**
  - Login successful. Returns a JSON object with a JWT token and user data.
  - Example:
    ```
    {
      "token": "<jwt_token>",
      "user": { ...user fields... }
    }
    ```
- **400 Bad Request**
  - Validation failed. Returns validation errors.
  - Example:
    ```
    { "errors": [ ... ] }
    ```
- **401 Unauthorized**
  - Invalid email or password. Returns an error message.
  - Example:
    ```
    { "message": "Invalid email or password" }
    ```

## Notes
- Both email and password are required.
- Returns a JWT token for authenticated sessions.

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token in the cookie or Authorization header.

## Authentication

- Required: Yes (JWT token)

## Responses

- **200 OK**
  - Returns the user profile data.
- **401 Unauthorized**
  - Missing or invalid token, or token is blacklisted.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

## Authentication

- Required: Yes (JWT token)

## Responses

- **200 OK**
  - Logout successful. Returns a message.
  - Example:
    ```
    { "message": "Logged out" }
    ```
- **401 Unauthorized**
  - Missing or invalid token, or token is blacklisted.
