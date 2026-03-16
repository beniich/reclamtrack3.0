import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../src/models/User.js'; // ensure .js extension for ES modules
import { logger } from '../src/utils/logger.js';

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri || mongoUri.includes('username:password')) {
      logger.error('❌ MONGODB_URI is missing or invalid. Please configure it in .env.');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    logger.info('✅ Connected to MongoDB');

    const email = 'beniich.contact@gmail.com';
    const password = '0000_-tr';

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      logger.info(`🔄 User [${email}] already exists. Updating role and password...`);
      user.role = 'admin';
      user.password = password; // The pre-save hook will hash it
      await user.save();
      logger.info('✅ Superadmin user updated successfully.');
    } else {
      logger.info(`➕ Creating new superadmin user [${email}]...`);
      user = new User({
        name: 'Super Admin Beniich',
        email,
        password, // The pre-save hook will hash it
        role: 'admin',
        isEmailVerified: true,
      });
      await user.save();
      logger.info('✅ Superadmin user created successfully.');
    }

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error seeding superadmin:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedSuperAdmin();
