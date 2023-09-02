const app = require('./app');
const dotenv = require('dotenv');
const connectToDB = require('./config/dbConnection');
dotenv.config();

const PORT = process.env.PORT || 6789;
app.listen(PORT, async() => {
    await connectToDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
