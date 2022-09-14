import { Schema, model } from 'mongoose'

interface iPortfolio {
  userId: Schema.Types.ObjectId,
  holdings: Schema.Types.ObjectId[]
}

const portfolioSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  holdings: {
    type: [Schema.Types.ObjectId],
    ref: 'Holding',
    required: true
  }
})

export default model('Portfolio', portfolioSchema)
