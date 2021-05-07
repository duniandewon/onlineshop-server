import express from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User';

const router = express.Router();

/**
 * @route   POST api/users
 * @desc    Register a user
 * @access  Public
 */

router.post('/', async (req, res) => {
	const { firstName, email, password } = req.body;

	if (!firstName) {
		return res.status(400).json({ msg: 'First name should not be empty' });
	}

	if (!email) {
		return res.status(400).json({ msg: 'Email should not be empty' });
	}

	if (!password) {
		return res.status(400).json({ msg: 'Password should not be empty' });
	}

	try {
		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: 'User already exist' });
		}

		const salt = await bcrypt.genSalt(10);

		const newPassword = await bcrypt.hash(password, salt);

		const newUser = new User({ ...req.body, password: newPassword });

		await newUser.save();

		return res.status(200).json(newUser);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ msg: 'Something went wrong' });
	}
});

export default router;
