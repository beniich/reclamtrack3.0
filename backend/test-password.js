import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { User } from './src/models/User.js';

config();

async function testPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: 'admin@reclamtrack.com' });
    const password = 'Admin123!';
    const matched = await user.comparePassword(password);
    const manualMatch = await bcrypt.compare(password, user.password);
    console.log(`MATCH_MODEL: ${matched}`);
    console.log(`MATCH_MANUAL: ${manualMatch}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testPassword();
