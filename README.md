# ACADEMIX HUB MANAGER - BACK-END

---
---

# CONTENTS

- [FRONT-END PROJECT](https://github.com/lsodiogo/academix-hub-manager-front-end)
- [BRIEFING](#briefing)
- [DIAGRAM](#diagram)
- [DATABASE](https://github.com/lsodiogo/academix-hub-manager-back-end/blob/main/docs/academix_hub_manager_database_2024-05-31.sql)
- [DATABASE INDEXES & RELATIONS](#database-indexes--relations)
- [ENDPOINTS](#endpoints)
  - [Overview](#overview)
  - [Login](#login)
  - [Check if logged in](#check-if-logged-in)
  - [Logout](#logout)
  - [Get (table name)'s all results](#get-table-names-all-results)
  - [Get (table name)'s results by ID](#get-table-names-results-by-id)
  - [Insert data into (table name)](#insert-data-into-table-name)
  - [Update data into (table name) by ID](#update-data-into-table-name-by-id)
  - [Delete data from (table name) by ID](#delete-data-from-table-name-by-id)
  - [Get backlog](#get-backlog)

---
---

# DATABASE INDEXES & RELATIONS

| TABLES | INDEXES | RELATIONS |
| ------ | ------- | --------- |
| ALL | id → primary key
| backlog | - | - |
| courses | name + edition_number → unique | teacher_id, status_id |
| lessons_schedule | date + begin_time + end_time + course_id → unique | course_id, status_id |
| school | name → unique | - |
| | abbreviation + name → unique | - |
| status | name → unique | - |
| students | name + surname → unique | course_id, status_id |
| teachers | name + surname → unique | status_id
| users | email → unique | - |

---
---

# ENDPOINTS

## Overview

This app uses the following endpoints and methods:

[`POST /login/`](#login)

[`GET /login/`](#check-if-logged-in)

[`GET /login/logout`](#logout)

[`GET /(table name)/`](#get-table-names-all-results)

[`GET /(table name)/:id`](#get-table-names-results-by-id)

[`POST /(table name)/`](#insert-data-into-table-name)

[`PUT /(table name)/:id`](#update-data-into-table-name-by-id)

[`DELETE /(table name)/:id`](#delete-data-from-table-name-by-id)

[`GET /backlog/`](#get-backlog)

| ⚠️ WARNING |
| --------- |
| Backlog table only access with admins users |
| User most be logged in |

---
---

## Login

### Request

`POST /login/`

### Body

Example POST body for login table:

```
{
	"email": "example@example.com",
	"password": "example",
	"rememberMe": true or false
}
```

---
---

## Check if logged in

### Request 

`GET /login/`

### Response

```
res.status(200).json(result);
```

---
---

## Logout

### Request 

`GET /login/logout`

### Response

```
res.status(200).json({
	type: "SUCCESS",
	message: `Logout successful!`
});
```

---
---

## Get (table name)'s all results

### Request

`GET /(table name)/`

| USER CATEGORY | ACCESS | 
| ------------- | ------ |
| Admins | Full access |
| Teachers | Limited access, no access to backlog table and status table and when access users table, which only will show his own result |
| Students | Limited access, no access to backlog table, status table and teachers table and when access users table, which only will show his own result |

### Response

Example response for users table:

| ⚠️ WARNING |
| --------- |
| When showing users table, hashed password is not shown |

```
{
	"totalItems": 4,
	"firstPage": null,
	"previous": null,
	"next": null,
	"lastPage": null,
	"results": [
		{
			"id": 68,
			"email": "admin",
			"category": "admin",
			"created_at": "2024-05-09T17:16:29.000Z",
			"updated_at": "2024-05-10T15:40:24.000Z"
		},
		{
			"id": 69,
			"email": "student",
			"category": "student",
			"created_at": "2024-05-09T17:16:40.000Z",
			"updated_at": "2024-05-09T17:16:40.000Z"
		},
		{
			"id": 70,
			"email": "teacher",
			"category": "teacher",
			"created_at": "2024-05-09T17:16:51.000Z",
			"updated_at": "2024-05-09T17:16:51.000Z"
		},
		{
			"id": 95,
			"email": "dante5085@google.couk",
			"category": "student",
			"created_at": "2024-05-10T16:15:46.000Z",
			"updated_at": "2024-05-10T16:15:46.000Z"
		}
	]
}
```

---
---

## Get (table name)'s results by ID

### Request

`GET /(table name)/:id`

| USER CATEGORY | ACCESS | 
| ------------- | ------ |
| Admins | Full access |
| Teachers | Limited access, no access to users table, except user self-search, and no access to status table |
| Students | Limited access, no access to users table, except user self-search, and no access to teachers table and status table and when students table only with self-search |

### Response

Example response for courses table:

```
{
	"id": 5,
	"name": "Full Stack Web Development",
	"edition_number": 12345,
	"hours_duration": 720,
	"begin_date": "2024-04-30T22:00:00.000Z",
	"end_date": "2025-05-30T22:00:00.000Z",
	"description": null,
	"teacher_id": 4,
	"status_id": 1,
	"created_at": "2024-04-24T12:42:33.000Z",
	"updated_at": "2024-04-25T19:32:19.000Z"
}
```

---
---

## Insert data into (table name)

### Request

`POST /(table name)/`

| USER CATEGORY | ACCESS | 
| ------------- | ------ |
| Admins | Only admins have permission to insert data and when a new user with category of teacher or student, email must be already entered at table of teachers or students |

### Body

Example POST body for users table:

```
{
	"email": "example@example.com",
	"password": "example",
	"category": "student"
}
```

---
---

## Update data into (table name) by ID

### Request

`PUT /(table name)/:id`

| USER CATEGORY | ACCESS | 
| ------------- | ------ |
| Admins | Only admins have permission to update data, except for users table updates, which must be done only by the user themselves and only possible to update password |

### Body

Example POST body for teachers table:

```
{
	"name": "Joelle",
	"surname": "Cummings",
	"birthdate": "1982-03-16T23:00:00.000Z",
	"email": "joelle@yahoo.com",
	"telef": "1-892-827-4039",
	"address": "129-7629 Risus. Rd.",
	"started_at": "2022-11-05",
	"status_id": 1
}
```

---
---

## Delete data from (table name) by ID

### Request

`DELETE /(table name)/:id`

| USER CATEGORY | ACCESS | 
| ------------- | ------ |
| Admins | Only admins have permission to delete data |

---
---

## Get backlog

### Request

`GET /backlog/`

| USER CATEGORY | ACCESS | 
| ------------- | ------ |
| Admins | Only admins have permission to see backlog |

---
---

# BRIEFING

![BRIEFING](https://github.com/lsodiogo/academix-hub-manager/blob/main/docs/briefing.svg)

---
---

# DIAGRAM

![DIAGRAM](https://github.com/lsodiogo/academix-hub-manager-back-end/blob/main/docs/diagram.svg)