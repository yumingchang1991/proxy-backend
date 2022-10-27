import { Schema, Model, Document, model } from 'mongoose'

interface iSymbolDocument extends Document {
  symbol: string,
  name: string,
  fees: string
}

interface iSymbol extends iSymbolDocument {

}

interface iSymbolModel extends Model<iSymbol> {

}

const symbolSchema: Schema = new Schema({
  symbol: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  fees: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
})

const Symbol: iSymbolModel = model<iSymbol, iSymbolModel>('Symbol', symbolSchema)
export default Symbol