# QuickCab Frontend Documentation

## Overview

QuickCab is a cab booking platform. This frontend is built using [React](https://react.dev/) and communicates with the backend via REST APIs and WebSocket for real-time updates.

---

## Getting Started

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the development server with `npm start`.

### Environment Variables

Configure API endpoints and socket URLs in `.env`:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

---

## Endpoints Usage

The frontend interacts with the backend using the following endpoints:

- **User Registration:** `POST /users/register`
- **User Login:** `POST /users/login`
- **User Profile:** `GET /users/profile`
- **User Logout:** `GET /users/logout`
- **Book Cab:** `POST /rides/book`
- **Get Available Cabs:** `GET /cabs/available`
- **Ride Status:** `GET /rides/status/:rideId`

All requests are made using `fetch` or `axios`. JWT tokens are stored in cookies or local storage for authentication.

---

## Navigation

The app uses React Router for navigation. Main routes include:

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/profile` - User profile
- `/book` - Book a cab
- `/rides` - View ride history/status

Navigation is handled via `<Link>` and `useNavigate`.

---

## Socket Connection

QuickCab uses [Socket.IO](https://socket.io/) for real-time communication:

- **Connection:** Socket is initialized on app load using the URL from `REACT_APP_SOCKET_URL`.
- **Events:**
  - `rideStatusUpdate` - Receive live ride status updates.
  - `cabLocationUpdate` - Track cab location in real-time.
  - `connect` / `disconnect` - Handle socket connection state.

Example usage:

```js
import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_SOCKET_URL);

socket.on("rideStatusUpdate", (data) => {
  // Update ride status in UI
});
```

---

## Authentication

- JWT tokens are required for protected routes.
- Tokens are sent in the Authorization header or stored in cookies.
- On logout, tokens are cleared and socket is disconnected.

---

## Features

- User registration and login
- Cab booking and ride tracking
- Real-time ride and cab updates via sockets
- Profile management
- Responsive UI

---

## Additional Notes

- Ensure backend is running and accessible at the configured API URL.
- Socket events are handled in context or hooks for live updates.
- Error handling and loading states are implemented for better UX.

---

## Contact

For issues or contributions, please open a GitHub issue or contact the maintainer.
