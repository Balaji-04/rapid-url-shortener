# Radid URL Shortener

This is a simple URL shortener project built using Node.js, Express.js, and MongoDB with Mongoose.

## Features

- **URL Shortening**: Convert long URLs into short, easy-to-share links.
- **MongoDB Storage**: Data is stored in MongoDB for scalability and flexibility.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Balaji-04/rapid-url-shortener.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file based on the provided `config-sample.png`.
   - Set `DB_URL` to your MongoDB connection string.

   ```
      DB_URL=
      DB_PASSWORD=
      PORT=8080
      VERSION=v1
      JWT_SECRET=
      JWT_EXPIRES_IN=1d
   ```

4. Start the server:

   ```
   npm start
   ```

## Usage

- To shorten a URL, send a POST request to `/api/v1/` with a JSON payload containing the long URL, and set your apiKey at the header of the request.

  ```
  {
    "longUrl": "https://example.com/very-long-url-path"
  }
  ```

- To signup as a user, send a post request to `/users/signup` with a JSON payload containing your name, email, and password.

  ```
  {
    "name": "ABCD",
    "email": "ABCD@gmail.com",
    "password": "12345678"
  }
  ```

- To login, send a post request to `/users/login` with a JSON payload containing your email and password. You'll get your session token as response. Your email will be validated.

```
  {
    "email": "ABCD@gmail.com",
    "password": "12345678"
  }
```

- To verify your userDetails, send a get request to `/users/get` with your header containing the field`"Authorization": Bearer <YOUR_TOKEN>`

- To update your details, send a patch request to `users/` with your header containing the field`"Authorization": Bearer <YOUR_TOKEN>` and the body containing the information to be updated i.e. email,name, or password.

- To get all userDetails, send a get request to `/users/all`, with your header containing the field`"Authorization": Bearer <YOUR_TOKEN>`. This is an protected route i.e only the admins will have access.

- To access a shortened URL, simply navigate to `/{shortUrl}` in your browser.

## Configuration

- You can configure the application settings in the `.env` file.

## Dependencies

- Node.js
- Express.js
- MongoDB (with Mongoose)
- dotenv (for environment variables)
- nodemon (for developing with ease)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize it further to fit your project's specific details and requirements!
