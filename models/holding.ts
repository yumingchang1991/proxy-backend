import { Schema, model } from 'mongoose'

interface iHolding {
  portfolio: Schema.Types.ObjectId,
  symbol: string,
  dateAdded: Date,
  quantity: number,
  unitCost: number,
  unitPrice: number
}

const holdingSchema: Schema = new Schema({
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unitCost: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  }
})

export default model('Holding', holdingSchema)
