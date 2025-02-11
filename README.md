# Blog App

## 📄 Description
Blog App is a robust Node.js application designed for managing tutorials, topics, and subtopics with role-based access control. It features secure API endpoints, efficient pagination, and comprehensive error handling.

## 🚀 Features
- User registration and authentication
- Role-based access control (SuperAdmin, Admin, Moderator, User)
- CRUD operations for Tutorials, Topics, and Subtopics
- Pagination support for efficient data handling
- Centralized error handling with custom `AppError`
- RESTful API architecture

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Testing:** Jest
- **Version Control:** Git, GitHub Actions (CI/CD)

## ⚙️ Installation
```bash
# Clone the repository
git clone https://github.com/navi212/blog_app.git

# Navigate to the backend directory
cd blog_app/backend

# Install dependencies
npm install

# Set up environment variables
cp .env .env

# Start the server
npm run dev
or
npm run prod
```

## 📡 Usage
- The API base URL: `http://localhost:3000/v1/api`
- Use tools like Postman or cURL to interact with the endpoints.

## 📚 API Documentation
Detailed API documentation can be found [here](./API_DOCUMENTATION.md).

## 🤝 Contributing
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add: YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## 📄 License
This project is licensed under the MIT License.

## 📬 Contact
- **Maintainer:** Joseph Nweke
- **Email:** josephchristo615@gmail.com
- **GitHub:** [navi212](https://github.com/navi212)

---

_Developed with ❤️ for seamless tutorial management._

