import { config } from 'dotenv';
import mongoose from 'mongoose';
import { User } from './src/models/User.js';

config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = 'test@test.com';
    await User.deleteOne({ email });
    const user = await User.create({
      email,
      password: 'Password123!',
      name: 'Test User',
      role: 'admin',
      isEmailVerified: true,
    });
    console.log(`Created user: ${user.email}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createTestUser();
