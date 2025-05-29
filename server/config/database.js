const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://elvicky994:m0ZoY7wTD4daFNyh@cluster0.gabo7up.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Add connection error handler
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Add disconnection handler
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (error.message.includes('IP address is not allowed')) {
      console.log('\nTo fix this:');
      console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com');
      console.log('2. Click on "Network Access" in the left sidebar');
      console.log('3. Click "Add IP Address"');
      console.log('4. Click "Allow Access from Anywhere" or add your specific IP');
      console.log('5. Click "Confirm"');
    }
    process.exit(1);
  }
};

module.exports = connectDB; 