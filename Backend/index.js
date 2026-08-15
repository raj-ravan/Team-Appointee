const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { initDB, db } = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root & Health Check
app.get('/', (req, res) => {
  res.json({
    app: 'Team-Appointee Backend API',
    status: 'Running',
    database: db.isMysqlConnected() ? 'MySQL Connected' : 'In-Memory Fallback Active'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', databaseConnected: db.isMysqlConnected() });
});

// 1. REGISTER ENDPOINT
// Frontend sends: { fullname, verifiedNumber, email, password }
app.post('/register', async (req, res) => {
  try {
    const { fullname, verifiedNumber, email, password } = req.body;

    if (!verifiedNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }

    // Check if user already exists
    const existingUser = await db.findUserByPhone(verifiedNumber);
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = await db.createUser({
      fullname: fullname || 'User',
      verified_number: verifiedNumber,
      email: email || '',
      password: hashedPassword
    });

    console.log(`[Auth] User registered successfully: ${verifiedNumber}`);
    res.json({ status: 'success', message: 'Registration successful!', user: { id: newUser.id, username: newUser.fullname } });
  } catch (error) {
    console.error('[Auth Error] Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// 2. LOGIN ENDPOINT
// Frontend expects array with [{ username }] on success, or { message: "..." } on error.
app.post('/login', async (req, res) => {
  try {
    const { verifiedNumber, password } = req.body;

    if (!verifiedNumber || !password) {
      return res.json({ message: 'Phone number and password are required' });
    }

    const user = await db.findUserByPhone(verifiedNumber);
    if (!user) {
      return res.json({ message: "User doesn't exist" });
    }

    // Check password match (supports hashed or direct text fallback)
    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = (password === user.password);
    }

    if (!isMatch) {
      return res.json({ message: 'Wrong combination' });
    }

    console.log(`[Auth] Login successful for: ${verifiedNumber}`);

    // Return array structure formatted specifically for Login.jsx: response.data[0].username
    res.json([
      {
        id: user.id,
        username: user.fullname || user.verified_number,
        email: user.email,
        verifiedNumber: user.verified_number
      }
    ]);
  } catch (error) {
    console.error('[Auth Error] Login error:', error);
    res.json({ message: 'An error occurred during login' });
  }
});

// 3. APPOINTMENT SELECTION ENDPOINT
// Frontend sends: { State, District, SubDistrict, Specialization, SelectHospital }
app.post('/appointment', async (req, res) => {
  try {
    const { State, District, SubDistrict, Specialization, SelectHospital, userPhone } = req.body;

    const appointment = await db.createAppointment({
      user_phone: userPhone || '',
      state: State || 'maharashtra',
      district: District || 'navi_mumbai',
      sub_district: SubDistrict,
      specialization: Specialization,
      hospital: SelectHospital
    });

    console.log(`[Appointment] Created appointment ID: ${appointment.id}`);
    res.json({ status: 'success', message: 'Appointment details saved successfully', appointmentId: appointment.id });
  } catch (error) {
    console.error('[Appointment Error]:', error);
    res.status(500).json({ message: 'Failed to record appointment request' });
  }
});

// 4. PATIENT FORM SUBMISSION ENDPOINT
// Frontend sends: { name, dateOfBirth, gender, phoneNo, address, city, state, appointmentDate, preference1, preference2, preference3 }
app.post('/patient', async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      gender,
      phoneNo,
      address,
      city,
      state,
      appointmentDate,
      preference1,
      preference2,
      preference3
    } = req.body;

    const patientForm = await db.createPatientForm({
      name,
      date_of_birth: dateOfBirth ? String(dateOfBirth) : '',
      gender,
      phone_no: phoneNo,
      address,
      city,
      state,
      appointment_date: appointmentDate ? String(appointmentDate) : '',
      preference1: preference1 || '',
      preference2: preference2 || '',
      preference3: preference3 || ''
    });

    console.log(`[Patient Form] Created patient entry ID: ${patientForm.id} for ${name}`);
    res.json({ status: 'success', message: 'Patient form filled successfully!', id: patientForm.id });
  } catch (error) {
    console.error('[Patient Form Error]:', error);
    res.status(500).json({ message: 'Error submitting patient form.' });
  }
});

// 5. CONTACT US ENDPOINT
// Frontend sends: { Name / name, email, message }
app.post('/contact', async (req, res) => {
  try {
    const name = req.body.Name || req.body.name;
    const { email, message } = req.body;

    const contactMsg = await db.createContactMessage({ name, email, message });
    console.log(`[Contact] Message received from ${email}`);
    res.json({ status: 'success', message: 'Message sent successfully!', id: contactMsg.id });
  } catch (error) {
    console.error('[Contact Error]:', error);
    res.status(500).json({ message: 'Failed to process contact message.' });
  }
});

// 6. RESET PASSWORD ENDPOINT
app.post('/resetpassword', async (req, res) => {
  try {
    const { verifiedNumber, password } = req.body;
    if (!verifiedNumber || !password) {
      return res.status(400).json({ message: 'Phone number and new password are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updated = await db.updateUserPassword(verifiedNumber, hashedPassword);
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`[Auth] Reset password for: ${verifiedNumber}`);
    res.json({ status: 'success', message: 'Password reset successfully!' });
  } catch (error) {
    console.error('[Reset Password Error]:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

// 7. OTP GENERATION & VERIFICATION ENDPOINTS
app.post('/send-otp', async (req, res) => {
  try {
    const { phoneNo } = req.body;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random code
    await db.saveOTP(phoneNo, otpCode);

    console.log(`[OTP] Generated OTP ${otpCode} for ${phoneNo}`);
    res.json({ status: 'success', message: 'OTP sent to mobile number', demoOtp: otpCode });
  } catch (error) {
    console.error('[OTP Error]:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

app.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNo, otp } = req.body;
    const isValid = await db.verifyOTP(phoneNo, otp);

    if (isValid) {
      res.json({ status: 'success', message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('[OTP Verification Error]:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

// 8. APPOINTMENT HISTORY ENDPOINT
app.get('/history', async (req, res) => {
  try {
    const { phoneNo } = req.query;
    let records;
    if (phoneNo) {
      records = await db.getPatientFormsByPhone(phoneNo);
    } else {
      records = await db.getAllPatientForms();
    }
    res.json({ status: 'success', count: records.length, records });
  } catch (error) {
    console.error('[History Error]:', error);
    res.status(500).json({ message: 'Failed to fetch appointment history' });
  }
});

// Initialize DB and start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Team-Appointee Backend Server is active on port ${PORT}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
});
