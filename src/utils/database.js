import mongoose from 'mongoose';

async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	await mongoose.connect(process.env.DATABSE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});

	console.log('Database connected!');
}

export default dbConnect;
