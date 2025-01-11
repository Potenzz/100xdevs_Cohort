import mongoose, { Schema, model } from 'mongoose';

// const mongoUrl: string = 'mongodb://localhost:27017/myDatabase'; // this localhost won't work, because in this 
// specific container, localhost:27017 isn't running anything, to connect with localhost:27017 of different running
// container, we will use networks.

// in network, when we create a mongo container which is connected to network, (read 1_Docker_deepDive.txt to do 
// this.)   we name it something, that name is required here for connection string. 
// i gave the name as mongoContainer, hence using it here.
const mongoUrl: string = 'mongodb://mongoContainer:27017/myDatabase'; 

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a User schema
interface IUser {
  name: string;
  age: number;
  email: string;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true }
});

// Create a User model
export const User = model<IUser>('User', UserSchema);