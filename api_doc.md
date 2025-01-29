# HackTheGrid API Documentation

## Deployed server

- url : [https://server.danizrafidz.my.id/](https://server.danizrafidz.my.id/)

&nbsp;

## Models :

_User_

```
- fullName: string, required
- email: string, required, unique
- password: string, required
- role: string, required
- avatarUrl: string, required
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
- UserId : integer, required
- ModuleId: integer, required
- isCompleted: boolean, required
```

_Teams_

```
- name : string, required
```

&nbsp;

## Endpoints :

List of available endpoints :

- `POST /register`
- `POST /login`

And routes below need authentication :

- `GET /modules`
- `GET /modules/:id`
- `GET /mymodules`
- `POST /mymodules/:moduleId`
- `GET /teams`

Routes below need authentication & authorization :

- `POST /modules`
- `DELETE /mymodules/:id`
- `PUT /clubs/:myClubId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "fullName": "string"
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

## 3. GET /modules

Description:

- Get all clubs from database

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
    "TeamId": 1
  },
  {
    "id": 2,
    "title": "Intro to Academy's Purple Modules",
    "imageUrl": "https://academy.hackthebox.com/storage/modules/257/logo.png",
    "description": "This module will introduce you to HTB Academy's Purple modules, which bridge the gap between Offensive and Defensive modules and provide a holistic view of both the attacking and defending perspectives on the covered topics. More specifically, the Purple modules will allow for in-depth forensic analysis through detailed logging, traffic and memory capturing, and an installed DFIR toolset within each target after completing the attack part of each section.",
    "tier": "Tier 0",
    "difficulty": "Medium",
    "TeamId": 3
  },
  ...,
]
```

title
imageUrl
description
tier
difficulty
TeamId
