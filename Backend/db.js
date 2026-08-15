const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'appointee_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// In-Memory Fallback Storage (used if MySQL server is offline)
const fallbackStore = {
  users: [],
  appointments: [],
  patient_forms: [],
  contact_messages: [],
  otps: []
};

let pool = null;
let isMysqlConnected = false;

async function initDB() {
  try {
    // First connection without DB selected to ensure database exists
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await tempConnection.end();

    // Create pool
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    
    // Create tables if not exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        verified_number VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_phone VARCHAR(20),
        state VARCHAR(100) NOT NULL DEFAULT 'maharashtra',
        district VARCHAR(100) NOT NULL DEFAULT 'navi_mumbai',
        sub_district VARCHAR(100) NOT NULL,
        specialization VARCHAR(100) NOT NULL,
        hospital VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS patient_forms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date_of_birth VARCHAR(100) NOT NULL,
        gender VARCHAR(50) NOT NULL,
        phone_no VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        appointment_date VARCHAR(100) NOT NULL,
        preference1 VARCHAR(100),
        preference2 VARCHAR(100),
        preference3 VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone_number VARCHAR(20) NOT NULL,
        otp_code VARCHAR(6) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    connection.release();
    isMysqlConnected = true;
    console.log(`[Database] Successfully connected to MySQL database: ${dbConfig.database}`);
  } catch (err) {
    isMysqlConnected = false;
    console.warn(`[Database Warning] MySQL connection failed (${err.message}).`);
    console.warn(`[Database Notice] Running backend with resilient in-memory fallback storage mode.`);
  }
}

// Database Operations Helper
const db = {
  isMysqlConnected: () => isMysqlConnected,
  getPool: () => pool,
  fallbackStore,

  // Users
  async findUserByPhone(phone) {
    if (isMysqlConnected) {
      const [rows] = await pool.query('SELECT * FROM users WHERE verified_number = ?', [phone]);
      return rows[0] || null;
    }
    return fallbackStore.users.find(u => u.verified_number === phone) || null;
  },

  async createUser({ fullname, verified_number, email, password }) {
    if (isMysqlConnected) {
      const [result] = await pool.query(
        'INSERT INTO users (fullname, verified_number, email, password) VALUES (?, ?, ?, ?)',
        [fullname, verified_number, email, password]
      );
      return { id: result.insertId, fullname, verified_number, email };
    }
    const newUser = { id: fallbackStore.users.length + 1, fullname, verified_number, email, password, created_at: new Date() };
    fallbackStore.users.push(newUser);
    return newUser;
  },

  async updateUserPassword(phone, hashedPassword) {
    if (isMysqlConnected) {
      await pool.query('UPDATE users SET password = ? WHERE verified_number = ?', [hashedPassword, phone]);
      return true;
    }
    const user = fallbackStore.users.find(u => u.verified_number === phone);
    if (user) {
      user.password = hashedPassword;
      return true;
    }
    return false;
  },

  // Appointments
  async createAppointment({ user_phone, state, district, sub_district, specialization, hospital }) {
    if (isMysqlConnected) {
      const [result] = await pool.query(
        'INSERT INTO appointments (user_phone, state, district, sub_district, specialization, hospital) VALUES (?, ?, ?, ?, ?, ?)',
        [user_phone || '', state || 'maharashtra', district || 'navi_mumbai', sub_district, specialization, hospital]
      );
      return { id: result.insertId };
    }
    const newAppointment = {
      id: fallbackStore.appointments.length + 1,
      user_phone,
      state: state || 'maharashtra',
      district: district || 'navi_mumbai',
      sub_district,
      specialization,
      hospital,
      created_at: new Date()
    };
    fallbackStore.appointments.push(newAppointment);
    return newAppointment;
  },

  // Patient Forms
  async createPatientForm(data) {
    const { name, date_of_birth, gender, phone_no, address, city, state, appointment_date, preference1, preference2, preference3 } = data;
    if (isMysqlConnected) {
      const [result] = await pool.query(
        `INSERT INTO patient_forms (name, date_of_birth, gender, phone_no, address, city, state, appointment_date, preference1, preference2, preference3)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, date_of_birth, gender, phone_no, address, city, state, appointment_date, preference1, preference2, preference3]
      );
      return { id: result.insertId };
    }
    const newPatient = { id: fallbackStore.patient_forms.length + 1, ...data, status: 'Pending', created_at: new Date() };
    fallbackStore.patient_forms.push(newPatient);
    return newPatient;
  },

  async getPatientFormsByPhone(phone) {
    if (isMysqlConnected) {
      const [rows] = await pool.query('SELECT * FROM patient_forms WHERE phone_no = ? ORDER BY id DESC', [phone]);
      return rows;
    }
    return fallbackStore.patient_forms.filter(p => p.phone_no === phone);
  },

  async getAllPatientForms() {
    if (isMysqlConnected) {
      const [rows] = await pool.query('SELECT * FROM patient_forms ORDER BY id DESC');
      return rows;
    }
    return fallbackStore.patient_forms;
  },

  // Contact Messages
  async createContactMessage({ name, email, message }) {
    if (isMysqlConnected) {
      const [result] = await pool.query(
        'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
      );
      return { id: result.insertId };
    }
    const newMsg = { id: fallbackStore.contact_messages.length + 1, name, email, message, created_at: new Date() };
    fallbackStore.contact_messages.push(newMsg);
    return newMsg;
  },

  // OTP
  async saveOTP(phoneNumber, otpCode) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    if (isMysqlConnected) {
      await pool.query('INSERT INTO otps (phone_number, otp_code, expires_at) VALUES (?, ?, ?)', [phoneNumber, otpCode, expiresAt]);
    } else {
      fallbackStore.otps.push({ phoneNumber, otpCode, isVerified: false, expiresAt });
    }
    return true;
  },

  async verifyOTP(phoneNumber, otpCode) {
    if (isMysqlConnected) {
      const [rows] = await pool.query(
        'SELECT * FROM otps WHERE phone_number = ? AND otp_code = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
        [phoneNumber, otpCode]
      );
      if (rows.length > 0) {
        await pool.query('UPDATE otps SET is_verified = TRUE WHERE id = ?', [rows[0].id]);
        return true;
      }
      return false;
    } else {
      const otpEntry = fallbackStore.otps.find(o => o.phoneNumber === phoneNumber && o.otpCode === otpCode);
      if (otpEntry) {
        otpEntry.isVerified = true;
        return true;
      }
      // Demo fallback: default OTP '123456' always verifies
      if (otpCode === '123456') return true;
      return false;
    }
  }
};

module.exports = { initDB, db };
