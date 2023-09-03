import app from './app.js';
import dotenv from 'dotenv';
import connectToDB from './config/dbConnection.js';
dotenv.config();

const PORT = process.env.PORT || 6789;
app.listen(PORT, async() => {
    await connectToDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
