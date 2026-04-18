// File: src/controllers/authController.js
const User = require('../../models/user');

exports.completeProfile = async (req, res) => {
  try {
    const { emailOrPhone, name, password } = req.body;
    if (!emailOrPhone || !name || !password) {
      return res.status(400).json({
        success: false,
        message: 'Isi datanya yang bener, kocak Jangan dikosongin.',
      });
    }
    const newUser = new User({
      emailOrPhone,
      name,
      password,
      isVerified: true,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Cakep! Profile berhasil dibikin.',
      data: { id: newUser._id, name: newUser.name }, // Jangan balikin passwordnya, gila lo!
    });
  } catch (error) {
    // Kalau error pas save (misal email udah kepake)
    console.error('Error lengkapnya:', error);
    res.status(500).json({
      success: false,
      message: 'Server lo meleduk atau email udah kepake.',
    });
  }
};
exports.getBasicProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User kagak ketemu anjir.' });
    }
    // Kalau ketemu, balikin datanya
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        emailOrPhone: user.emailOrPhone,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ngambil data.' });
  }
};
