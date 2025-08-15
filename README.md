# QuickCab

QuickCab is a cab booking platform that enables users to register, book rides, track cabs in real-time, and manage their profiles. The project consists of a React-based frontend and a Node.js/Express backend, connected via REST APIs and WebSocket for live updates.

---

## Project Description

QuickCab provides a seamless experience for booking cabs, tracking rides, and managing user accounts. It features secure authentication, real-time ride status updates, and a responsive user interface.

---

## Tech Stack

- **Frontend:** React, Socket.IO-client, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Socket.IO
- **Authentication:** JWT (JSON Web Token)
- **Real-time:** Socket.IO

---

## Developers

- Rajeev Singh
- Rajdeep Mishra

---

## How to Clone

```bash
git clone https://github.com/deepcodesss/QuickCab
cd quickcab
```

### Setup Backend

```bash
cd Backend
npm install
npm start
```

### Setup Frontend

```bash
cd ../Frontend
npm install
npm start
```

---

## Backend & Frontend Connection

- The frontend communicates with the backend using REST API endpoints for authentication, booking, and profile management.
- Real-time updates (ride status, cab location) are handled via Socket.IO.
- Configure API and socket URLs in the frontend `.env` file to match backend server address.

---

## Features

- User registration and login
- Cab booking and ride tracking
- Real-time ride and cab updates
- Profile management
- Secure authentication
- Responsive design

---

## Additional Notes

- Ensure MongoDB is running for backend data storage.
- Update `.env` files in both frontend and backend for correct URLs and secrets.
- For any issues, open a GitHub issue or contact the developers.

---

## License

This project is for educational purposes.
