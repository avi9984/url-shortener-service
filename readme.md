# URL Shortener Service

## Overview
The **URL Shortener Service** provides a way to shorten URLs with additional features such as expiration dates, real-time click analytics, and spam detection. Built with **Node.js**, **TypeScript**, and **MongoDB**, it follows REST API best practices and is designed for scalability and ease of use.

---

## Features
1. **Short URL Creation**:
   - Generate a unique short URL for any original URL.
   - Optionally set expiration dates for the shortened links.
2. **Analytics**:
   - Track the how many clicks .
   - Get visitor geography based on IP addresses.
3. **Spam Detection**:
   - Prevent shortening of potentially harmful or spam URLs.
4. **Rate Limiting** (Future Scope):
   - Limit API requests per user to prevent abuse.
5. **Data Export** (Future Scope):
   - Export analytics data as a CSV file for further analysis.

---

## Technology Stack
- **Backend**: Node.js, TypeScript, Express.js
- **Database**: MongoDB
- **Dependencies**:
  - `crypto`: For generating secure short URLs.
  - `mongoose`: For database modeling and queries.
  - `dotenv`: For managing environment variables.
  - `morgan`: For logging API requests.
---

## Installation


1. Clone the repository:
   ```bash
   git clone https://github.com/avi9984/url-shortener-service.git
   ```
   ``` cd url-shortener-service ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
    PORT=3000
    MONGO_URL="mongodb://localhost:27017/url-shortener"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
 5. The API will be available at http://localhost:3000.
## API Endpoints

### Create Sort Url
```bash
POST http://localhost:3000/url/create-url
Body: 
{
    "originalUrl":"https://app.galxe.com/quest/giza"
}
```
**Response**:
```json
{
    "status": true,
    "message": "URL create successfully",
    "shortUrl": "https://short.ly/cjbb4u7o",
    "shortUrlCode": "cjbb4u7o",
    "originalUrl": "https://app.galxe.com/quest/giza"
}
```
### Redirect-Link
```bash
GET http://localhost:3000/url/cjbb4u7o
```
**Response**: https://app.galxe.com/quest/giza

### Get Analytics
```bash
GET http://localhost:3000/analytics/cjbb4u7o

```
**Response**:
```json
{
    "status": true,
    "message": "Get the clicks",
    "clicks": 9,
    "originalUrl": "https://app.galxe.com/quest/giza",
    "clickData": [
        {
            "timestamp": "2024-12-07T11:15:10.744Z",
            "ip": "::1",
            "_id": "67542e3e57811ac5961351de"
        },
        {
            "timestamp": "2024-12-07T11:15:11.633Z",
            "ip": "::1",
            "_id": "67542e3f57811ac5961351e2"
        },
        {
            "timestamp": "2024-12-07T11:15:53.758Z",
            "ip": "::1",
            "_id": "67542e6957811ac5961351e7"
        },
        {
            "timestamp": "2024-12-07T11:15:54.647Z",
            "ip": "::1",
            "_id": "67542e6a57811ac5961351ed"
        },
        {
            "timestamp": "2024-12-07T11:46:05.392Z",
            "ip": "::1",
            "_id": "6754357d7ceadf565c881eae"
        }
    ]
}
```

## Error Handling
- **403 Forbidden**: If the user does not have access to the resource.
- **400 Bad Request**: For invalid inputs.
- **500 Internal Server Error**: For server-side issues.