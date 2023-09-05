import app from './app.js';
import dotenv from 'dotenv';
import connectToDB from './config/dbConnection.js';
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay';
dotenv.config();

const PORT = process.env.PORT || 6789;

cloudinary.v2.config({ 
  cloud_name: 'dwdv20jnf', 
  api_key: process.env.CLOUDINARY_APIKEYS, 
  api_secret: process.env.CLOUDINARY_SECRET
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, async() => {
    await connectToDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});


