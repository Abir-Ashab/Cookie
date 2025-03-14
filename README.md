# Cookie Handling Demo

This project demonstrates handling cookies and managing cross-origin requests between a frontend and a backend using cookies.

## Overview

The application consists of two parts:
- **Frontend** (`index.html`): A simple web page with a login button that sends a request to a backend to set a cookie.
- **Backend** (`index.js`): An Express server that handles setting the cookie and serving an image, only if the user has the cookie.

## Requirements

- Node.js
- npm or yarn

## Setup

### Backend

1. Clone or download the repository.
2. Navigate to the backend directory (where `index.js` is located).
3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the server:

    ```bash
    node index.js
    ```

The backend will start listening on port `8080`. It handles two routes:
- `GET /login`: Sets a cookie (`user=hussein`) with the `SameSite=None` and `Secure` flags.
- `GET /img`: Serves an image if the `user` cookie is present; returns a `403` status code if no cookie is found.

### Frontend

1. Clone or download the frontend files (containing `index.html`).
2. Open the `index.html` file in a browser.

The frontend contains:
- A button to trigger a `GET` request to the backend (`/login`), which sets a cookie.
- An image displayed only if the user has the correct cookie set.

### CORS Configuration

The backend uses CORS middleware to allow requests from specified origins. The allowed origins are:
- `https://cookie-si4u.vercel.app`

If your frontend is running from a different origin, ensure you modify the CORS configuration on the backend to match.

### Cookie Flags

The backend sets a cookie with the following flags:

1. **`SameSite`**: 
   - Controls when the cookie is sent in cross-origin requests.
   - Values:
     - `Strict`: Cookie is sent only in first-party contexts.
     - `Lax`: Cookie is sent with top-level navigations.
     - `None`: Cookie is sent with all requests, including cross-origin (must be used with `Secure`).
     - `const cookie = "user=hussein;"; This cookie doesn't have the SameSite or Secure flags necessary for cross-origin requests in modern browsers.`

2. **`Secure`**: 
   - Ensures the cookie is only sent over HTTPS connections, preventing it from being sent over insecure HTTP.

3. **`HttpOnly`**: 
   - Ensures the cookie is only accessible by the server and not via JavaScript, improving security against XSS (Cross-Site Scripting) attacks.

4. **`Max-Age` / `Expires`**: 
   - Controls the expiration of the cookie.
     - `Max-Age`: Time (in seconds) until the cookie expires.
     - `Expires`: Specific date and time when the cookie expires.

### Frontend Logic

- On page load, the button will be visible unless a cookie is already set in the browser. 
- When the user clicks the button, a `GET` request is made to the backend to set the cookie.
- If the cookie is set, the frontend attempts to display an image from the backend (accessible via the `/img` route).

### Debugging

If cookies are not being set, ensure the following:
- The CORS configuration allows the frontend's origin.
- The `credentials: "include"` option is set in the `fetch` request on the frontend.
- Check the browser's Developer Tools Network tab to see if the `Set-Cookie` header is being sent from the backend.

## License

This project is licensed under the MIT License.

---

This README now includes an explanation of the cookie flags (`SameSite`, `Secure`, `HttpOnly`, and `Max-Age/Expires`) and their purpose in your application. Let me know if you'd like to add anything else!
