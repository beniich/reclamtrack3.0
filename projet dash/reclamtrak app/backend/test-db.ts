import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/reclamtrack';

async function test() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB:', mongoUri);

    const db = mongoose.connection.db;
    const users = await db.collection('users').find({ email: 'admin@reclamtrack.com' }).toArray();
    console.log('Found users:', users.length);

    if (users.length > 0) {
      const user = users[0];
      console.log('User email:', user.email);
      console.log('User role:', user.role);
      // test password
      const match = await bcrypt.compare('Admin123!', user.password);
      console.log('Password "Admin123!" matches?', match);
    } else {
      console.log('No user found. Seeding may not have occurred.');
    }

    const superAdmin = await db
      .collection('users')
      .findOne({ email: 'superadmin@reclamtrack.com' });
    if (superAdmin) {
      const matchSuper = await bcrypt.compare('SuperAdmin123!', superAdmin.password);
      console.log('superadmin "SuperAdmin123!" matches?', matchSuper);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}
test();
