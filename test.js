// Import the jsonwebtoken library
import jwt from 'jsonwebtoken';

// Sample JWT token (replace this with your actual token)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFlNWQ4N2UwNGRkMzJiOTI1ZWZlZTEiLCJlbWFpbCI6ImFsZXhrYXJraTIwNjBAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhYXl1c2thcmtpIiwiZnVsbG5hbWUiOiJhYXl1cyBrYXJraSIsImlhdCI6MTcxMzM1ODgzOCwiZXhwIjoxNzEzNDQ1MjM4fQ.Dxhv_lmQcv2Wl6H7bBomwOq63XqJp4BJBYM7k2jhrxs';

// Decode the JWT token to access its payload
const decodedToken = jwt.decode(token);

console.log(decodedToken)

// Access the expiration claim (exp) from the decoded token
const expirationTime = decodedToken.exp;

// Get the current time in seconds (UNIX timestamp)
const currentTime = Math.floor(Date.now() / 1000);

// Compare the expiration time with the current time
if (expirationTime && currentTime >= expirationTime) {
  console.log('Token is expired');
} else {
  console.log('Token is not expired');
}
