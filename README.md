# Learning Management System (LMS) Website
Welcome to our Learning Management System (LMS) website! This website has been developed using the MERN (MongoDB, Express.js, React, Node.js) stack and offers a range of features to facilitate online learning. Users can access courses, view and upload lectures, and make payments through Razorpay integration. Additionally, there are separate access levels for administrators and regular users.

## Table of Contents
1. Features
2. Getting Started
3. Usage
4. Razorpay Integration
5. Contributing

## Features
## General Features
User registration and authentication.
User-friendly dashboard for course management.
Separate access for administrators and regular users.
Responsive design for mobile and desktop users.
User profiles with personal information and course progress tracking.

## Admin Features
Create and manage courses.
Upload and organize lecture materials.
Monitor user progress and statistics.
Manage user accounts.

## User features
Browse and enroll in available courses.
Access course materials and lectures.
Track progress and complete assignments.
Make payments through Razorpay.

## Getting Started
Before you begin, ensure you have met the following requirements:

Node.js and npm (Node Package Manager) installed on your machine.
MongoDB set up and running locally or accessible via a remote connection.
Razorpay API keys for payment processing (get them from the Razorpay dashboard).

### Installation
1. Clone the repository
git clone https://github.com/ShubhamTiwari55/LMS_FullStack.git

2. Navigate to the project directory
cd your-project-directory

3. Install server dependencies
cd server
npm install

4. Install client dependencies
cd ../client
npm install

5. Create a .env file in the server directory and add the following variables with your configuration:
PORT=your_port_number
MONGODB_URI=your_mongodb_uri
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

6. Start the server:
npm run dev

7. Start the client
cd ../client
npm run dev

The application should now be up and running locally.

## Razorpay integration
Our LMS website integrates Razorpay for seamless payment processing. Users can make payments securely using Razorpay's services. Make sure to configure your Razorpay API keys correctly in the .env file as mentioned in the installation steps.

## Contributing
I welcome contributions from the community! Feel free to open issues, submit pull requests, or suggest improvements to help us make this LMS even better.
