# HackTheGrid API Documentation

## Deployed server

- url : [https://server.danizrafidz.my.id/](https://server.danizrafidz.my.id/)

- registered user :

```js
admin = { email: "admin.alpha@mail.com", password: "adminalpha" };
user = { email: "red.romeo@mail.com", password: "redromeo" };
```

&nbsp;

## Models :

_User_

```

- fullName: string, required
- email: string, required, unique
- password: string, required
- role: string, required
- avatarUrl: string, default
- TeamId: integer, required

```

_Modules_

```

- title: string, required
- imageUrl: string, required
- description: text, required
- tier: string, required
- difficulty: string, required
- AuthorId: integer, required
- TeamId: integer, required

```

_MyModules_

```

- UserId: integer, required
- ModuleId: integer, required
- isCompleted: boolean, required

```

_Teams_

```

- name: string, required
- focus: string, required

```

&nbsp;

## Endpoints :

List of available endpoints :

- `POST /register`
- `POST /login`

And routes below need authentication :

- `GET /user`
- `PATCH /user/cover-avatar`
- `GET /modules`
- `GET /modules/:id`
- `GET /mymodules`
- `POST /mymodules/:moduleId`
- `GET /teams`

Routes below need authentication & authorization :

- `DELETE /mymodules/:id`
- `PATCH /mymodules/:id/complete`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "avatarUrl": "string (optional)",
  "TeamId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 5,
  "fullName": "Dummy Delta",
  "email": "dummy.delta@mail.com",
  "role": "user",
  "avatarUrl": "https://dummy.png",
  "TeamId": 2
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Full Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Team is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /user

Description:

- Get current logged-in user from database

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
  "id": 5,
  "fullName": "Dummy Delta",
  "email": "dummy.delta@mail.com",
  "role": "user",
  "avatarUrl": "https://dummy.png",
  "TeamId": 2,
  "createdAt": "2025-01-29T13:01:08.846Z",
  "updatedAt": "2025-01-29T13:01:08.846Z",
  "Team": {
    "id": 2,
    "name": "Blue",
    "focus": "Defensive"
  }
}
```

&nbsp;

## 4. PATCH /user/cover-avatar

Description:

- Update user avatar

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
  "message": "User avatar successfully updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Image is required"
}
```

&nbsp;

## 5. GET /modules

Description:

- Get all modules include team from database

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Intro to Academy",
    "imageUrl": "https://academy.hackthebox.com/storage/modules/15/logo.png",
    "description": "Your first stop in Hack The Box Academy to become acquainted with the platform, its features, and its learning process.",
    "tier": "Tier 0",
    "difficulty": "Fundamental",
    "AuthorId": 1,
    "TeamId": 1,
    "Team": {
        "id": 1,
        "name": "Red",
        "focus": "Offensive"
    }
  },
  {
    "id": 2,
    "title": "Intro to Academy's Purple Modules",
    "imageUrl": "https://academy.hackthebox.com/storage/modules/257/logo.png",
    "description": "This module will introduce you to HTB Academy's Purple modules, which bridge the gap between Offensive and Defensive modules and provide a holistic view of both the attacking and defending perspectives on the covered topics. More specifically, the Purple modules will allow for in-depth forensic analysis through detailed logging, traffic and memory capturing, and an installed DFIR toolset within each target after completing the attack part of each section.",
    "tier": "Tier 0",
    "difficulty": "Medium",
    "AuthorId": 1,
    "TeamId": 3,
    "Team": {
        "id": 3,
        "name": "Purple",
        "focus": "Hybrid"
    }
  },
  ...,
]
```

&nbsp;

## 6. GET /modules/:id

Description:

- Get one module by Id from database

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "Intro to Academy",
  "imageUrl": "https://academy.hackthebox.com/storage/modules/15/logo.png",
  "description": "Your first stop in Hack The Box Academy to become acquainted with the platform, its features, and its learning process.",
  "tier": "Tier 0",
  "difficulty": "Fundamental",
  "AuthorId": 1,
  "TeamId": 1,
  "createdAt": "2025-01-29T08:53:42.214Z",
  "updatedAt": "2025-01-29T08:53:42.214Z",
  "Team": {
    "id": 1,
    "name": "Red",
    "focus": "Offensive"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Module not found"
}
```

&nbsp;

## 7. GET /mymodules

Description:

- Fetch all modules in logged-in user's module list.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "UserId": 5,
    "ModuleId": 7,
    "isCompleted": false,
    "createdAt": "2025-01-29T14:00:02.523Z",
    "updatedAt": "2025-01-29T14:00:02.523Z",
    "Module": {
      "id": 7,
      "title": "Learning Process",
      "imageUrl": "https://academy.hackthebox.com/storage/modules/9/logo.png",
      "description": "The learning process is one of the essential and most important components that is often overlooked. This module does not teach you techniques to learn but describes the process of learning adapted to the field of information security. You will learn to understand how and when we learn best and increase and improve your learning efficiency greatly.",
      "tier": "Tier 0",
      "difficulty": "Fundamental",
      "AuthorId": 1,
      "TeamId": 3,
      "Team": {
        "id": 3,
        "name": "Purple",
        "focus": "Hybrid"
      }
    }
  },
  {
    "id": 2,
    "UserId": 5,
    "ModuleId": 10,
    "isCompleted": false,
    "createdAt": "2025-01-29T14:00:05.571Z",
    "updatedAt": "2025-01-29T14:00:05.571Z",
    "Module": {
      "id": 10,
      "title": "Network Enumeration with Nmap",
      "imageUrl": "https://academy.hackthebox.com/storage/modules/19/logo.png",
      "description": "Nmap is one of the most used networking mapping and discovery tools because of its accurate results and efficiency. The tool is widely used by both offensive and defensive security practitioners. This module covers fundamentals that will be needed to use the Nmap tool for performing effective network enumeration.",
      "tier": "Tier I",
      "difficulty": "Easy",
      "AuthorId": 1,
      "TeamId": 1,
      "Team": {
        "id": 1,
        "name": "Red",
        "focus": "Offensive"
      }
    }
  },
  ...,
]
```

&nbsp;

## 8. POST /mymodules/:moduleId

Description:

- Add module to the logged-in user's module list.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "moduleId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "UserId": 5,
  "ModuleId": 11,
  "isCompleted": false
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Module not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You cannot add same module"
}
```

&nbsp;

## 9. GET /teams

Description:

- Get all teams from database

Request:

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Red",
    "focus": "Offensive"
  },
  {
    "id": 2,
    "name": "Blue",
    "focus": "Defensive"
  },
  ...
]
```

&nbsp;

## 10. DELETE /mymodules/:id

Description:

- Delete user module by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "User module successfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User module not found"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## 11. PATCH /mymodules/:id/complete

Description:

- Update mymodule completion by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "User module completion successfully updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You cannot update completed module"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User module not found"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
