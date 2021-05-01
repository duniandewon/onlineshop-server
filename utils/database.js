import {MongoClient} from 'mongodb'

const connectDB = async () => {
  const uri = process.env.DATABSE_URI

  try {
    await MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log("Connected to databse!")
  } catch (err) {
    throw new Error(err)
  }
}

export default connectDB