import { config } from 'dotenv';
import mongoose from 'mongoose';
import { User } from './src/models/User.js';

config();

async function checkDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({}, { email: 1 });
    console.log(
      'User Emails:',
      users.map((u) => u.email)
    );
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDb();
