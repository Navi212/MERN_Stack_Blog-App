# 📚 Blog App API Documentation

## 🚀 Base URL
```
https://localhost:8000/v1/api
```

---

## 📦 Endpoints Overview
- **Tutorials:** Manage tutorials (create, read, update, delete)
- **Topics:** Manage topics within tutorials
- **Subtopics:** Manage subtopics under topics

---

## 📋 General Response Format
```json
{
  "success": true,
  "message": "Action completed successfully",
  "content": { }                             
}
```

## ⚠️ Error Response Example
```json
{
  "success": false,
  "message": "Invalid tutorialId"
}
```

---

# 📗 Tutorials Endpoints

### 1️⃣ Get All Tutorials
- **GET** `/tutorials`
- **Query Parameters:**
  - `page` (optional) - Pagination page number
  - `limit` (optional) - Results per page

**Response:**
```json
{
  "success": true,
  "content": [ { "_id": "123", "name": "JavaScript Basics", "description": "Learn JS" } ]
}
```

---

### 2️⃣ Get a Specific Tutorial
- **GET** `/tutorials/:tutorialId`

**Response:**
```json
{
  "success": true,
  "content": { "_id": "123", "name": "JavaScript Basics", "description": "Learn JS" }
}
```

---

### 3️⃣ Create a Tutorial
- **POST** `/tutorials`
- **Request Body:**
```json
{
  "name": "Node.js Mastery",
  "description": "Deep dive into Node.js"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Tutorial created"
}
```

---

### 4️⃣ Update a Tutorial
- **PATCH** `/tutorials/:tutorialId`
- **Request Body (partial updates allowed):**
```json
{
  "name": "Advanced Node.js"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tutorial updated"
}
```

---

### 5️⃣ Delete a Tutorial
- **DELETE** `/tutorials/:tutorialId`

**Response:**
```json
{
  "success": true,
  "message": "Tutorial deleted"
}
```

---

# 📘 Topics Endpoints

### 1️⃣ Get All Topics for a Tutorial
- **GET** `/tutorials/:tutorialId/topics`
- **Query Parameters:** `page`, `limit`

### 2️⃣ Get a Specific Topic
- **GET** `/tutorials/:tutorialId/topics/:topicId`

### 3️⃣ Create a Topic
- **POST** `/tutorials/:tutorialId/topics`
- **Request Body:**
```json
{
  "name": "Async in JS",
  "description": "Promises and Async/Await",
  "content": "Detailed content here"
}
```

### 4️⃣ Update a Topic
- **PATCH** `/tutorials/:tutorialId/topics/:topicId`

### 5️⃣ Delete a Topic
- **DELETE** `/tutorials/:tutorialId/topics/:topicId`

---

# 📙 Subtopics Endpoints

### 1️⃣ Get All Subtopics for a Topic
- **GET** `/tutorials/:tutorialId/topics/:topicId/subtopics`

### 2️⃣ Get a Specific Subtopic
- **GET** `/tutorials/:tutorialId/topics/:topicId/subtopics/:subtopicId`

### 3️⃣ Create a Subtopic
- **POST** `/tutorials/:tutorialId/topics/:topicId/subtopics`
- **Request Body:**
```json
{
  "name": "Callbacks",
  "description": "Introduction to Callbacks",
  "content": "Callback functions in JS"
}
```

### 4️⃣ Update a Subtopic
- **PATCH** `/tutorials/:tutorialId/topics/:topicId/subtopics/:subtopicId`

### 5️⃣ Delete a Subtopic
- **DELETE** `/tutorials/:tutorialId/topics/:topicId/subtopics/:subtopicId`

---

# 🛡️ Error Codes
| Code | Message                  | Description                      |
|------|---------------------------|----------------------------------|
| 400  | Invalid ID                | Missing or invalid parameter     |
| 404  | Not Found                 | Resource not found               |
| 500  | Internal Server Error     | Something went wrong on the server |

---

# ✅ Best Practices
- Use proper HTTP methods: `GET`, `POST`, `PATCH`, `DELETE`
- Handle pagination for large data sets
- Always validate request body and parameters
- Consistent error responses for easier debugging

---

# 🔗 Example Request (cURL)
```bash
curl -X GET http://localhost:8000/v1/api/tutorials -H "Authorization: Bearer <token>"
```

