import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const clearAllUsers = async () => {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Count users before deletion
    const userCount = await User.countDocuments();
    console.log(`📊 Found ${userCount} user(s) in database`);

    if (userCount === 0) {
      console.log('ℹ️  No users to delete');
      process.exit(0);
    }

    // Delete all users
    console.log('🗑️  Deleting all users...');
    const result = await User.deleteMany({});
    console.log(`✅ Successfully deleted ${result.deletedCount} user(s)`);

    // Verify deletion
    const remainingUsers = await User.countDocuments();
    console.log(`📊 Remaining users: ${remainingUsers}`);

    if (remainingUsers === 0) {
      console.log('🎉 Database cleared successfully!');
    } else {
      console.log('⚠️  Warning: Some users may still remain');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing users:', error.message);
    process.exit(1);
  }
};

// Run the script
clearAllUsers();