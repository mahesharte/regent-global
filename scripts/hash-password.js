#!/usr/bin/env node

/**
 * Password hashing utility for admin credentials
 * 
 * Usage:
 *   node scripts/hash-password.js
 *   
 * This script will prompt you to enter a password and output the bcrypt hash.
 * Copy the hash and paste it into your .env file as ADMIN_PASSWORD.
 */

const bcryptjs = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askPassword = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

const hashPassword = async () => {
  console.log('\n📝 Admin Password Hasher\n');
  console.log(
    'This utility generates a bcrypt hash for your admin password.'
  );
  console.log(
    'Paste the output hash into your .env file as ADMIN_PASSWORD.\n'
  );

  try {
    const password = await askPassword(
      '🔐 Enter the admin password: '
    );

    if (!password) {
      console.log('\n❌ Password cannot be empty');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Hashing password (this may take a moment)...\n');

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    console.log('✅ Hash generated successfully!\n');
    console.log('📋 Copy this hash to your .env file:\n');
    console.log(`ADMIN_PASSWORD=${hash}\n`);
    console.log('---\n');
    console.log('Remember:');
    console.log('- Keep this hash secret and never share it');
    console.log('- Store it in your .env file locally (not in version control)');
    console.log('- Set the ADMIN_USERNAME in your .env as well\n');

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error hashing password:', error);
    rl.close();
    process.exit(1);
  }
};

hashPassword();
