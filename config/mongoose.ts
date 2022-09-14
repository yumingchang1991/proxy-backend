import { connect, connection } from 'mongoose'
import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()

connect(process.env.MONGODB_URI as string)

connection.on('open', () => console.log('MongoDB is connected'))
connection.on('error', () => console.log('MongoDB is connected'))
