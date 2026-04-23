// File: src/controllers/authController.js
const User = require('../../models/user');

exports.completeProfile = async (req, res) => {
  try {
    const { emailOrPhone, name, password } = req.body;
    if (!emailOrPhone || !name || !password) {
      return res.status(400).json({
        success: false,
        message: 'Masukkan data yang valid.',
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
      message: 'Profile berhasil dibuat.',
      data: { id: newUser._id, name: newUser.name },
    });
  } catch (error) {
    console.error('Error lengkapnya:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Silakan coba lagi nanti.',
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
        .json({ success: false, message: 'User tidak ditemukan.' });
    }
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        emailOrPhone: user.emailOrPhone,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error mengambil data.' });
  }
};
