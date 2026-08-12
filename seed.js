// Creates the default admin login (username: admin, password: admin123)
// Run with: npm run seed
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await pool.query(
      `INSERT INTO users (username, password)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE password = VALUES(password)`,
      ['admin', hashedPassword]
    );

    console.log('Admin user seeded successfully.');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
