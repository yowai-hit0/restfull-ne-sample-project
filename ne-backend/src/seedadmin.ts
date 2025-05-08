import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import prisma from './prisma/prisma-client'; // Adjust the import path as necessary

dotenv.config(); 

const seedAdmin = async () => {
  try {
    // Check if admin exists
    const adminExists = await prisma.user.findFirst({where:{role:'ADMIN'}});

    if (!adminExists) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS || "admin123", 10); 

      // Create the admin user
      await prisma.user.create({data : {
        firstName: 'Yasmine',
        lastName: 'Barasingiza',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',  
        password: hashedPassword,
        role: 'ADMIN',
      }});

      console.log('Admin user created successfully');
    } else {
      console.log('Admin already exists');
    }
  } catch (error:any) {
    console.error('Error creating admin:', error.message || error);
  }
};

seedAdmin();