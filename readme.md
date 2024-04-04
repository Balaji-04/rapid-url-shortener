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

4. Start the server:

   ```
   npm start
   ```

## Usage

- To shorten a URL, send a POST request to `/api/v1/` with a JSON payload containing the long URL:

  ```
  {
    "longUrl": "https://example.com/very-long-url-path"
  }
  ```

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
