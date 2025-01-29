# myChatApp

myChatApp is a real-time chat application built using **React** for the frontend, **Express.js** for the backend, and **Socket.IO** for real-time communication. This project allows users to **register, log in, and chat** with other users in real time. The application is designed to be **scalable, modular, and easy to extend**.

---

## Features
- **User Authentication**: Secure user registration and login.
- **Real-Time Chat**: Send and receive messages instantly using Socket.IO.
- **Online Status**: View which users are online.
- **Notifications**: Get notified when receiving a new message.
- **Responsive Design**: Built with a mobile-first approach using Tailwind CSS.

---

## Technologies Used
### Frontend:
- **React**
- **Tailwind CSS**
- **Vite**

### Backend:
- **Express.js**
- **Socket.IO**

### Database:
- **MongoDB** (via Mongoose)

### Authentication:
- **JWT** (JSON Web Tokens)

### Real-Time Communication:
- **Socket.IO**

---

## Prerequisites
Ensure you have the following installed before proceeding:
- **Node.js** (v16 or higher)
- **MongoDB** (or a MongoDB Atlas connection string)
- **NPM** or **Yarn**

---

## Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/Amplejohnny/myChatApp.git
cd myChatApp
```

### 2. Install Backend Dependencies:
```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies:
```bash
cd ../Frontend
npm install
```

### 4. Set Up Environment Variables:
#### Backend (`Backend/.env`):
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8080
```

#### Frontend (`Frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5173
```

### 5. Run the Backend Server:
```bash
cd ../Backend
npm start
```

### 6. Run the Frontend Development Server:
```bash
cd ../Frontend
npm run dev
```

### 7. Open the App:
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Contributing
Contributions are welcome! Follow these steps:
1. **Fork** the repository.
2. **Create a new branch**: `git checkout -b feature/YourFeatureName`
3. **Commit your changes**: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/YourFeatureName`
5. **Open a pull request**

---

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Acknowledgments
- **React** for the frontend framework.
- **Express.js** for the backend framework.
- **Socket.IO** for real-time communication.
- **Tailwind CSS** for styling.

---

## Contact
For any questions or feedback, feel free to reach out:

- **amplejohnny** - workatdeveloper@gmail.com
- **GitHub**: [Amplejohnny](https://github.com/Amplejohnny)

Enjoy chatting! 🚀

