import mongoose, { Schema } from 'mongoose'


const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortname: {
    type: String,
    required: true,
  },
  reknown: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
})

artistSchema.virtual('id').get(function() {
  return this._id
})

artistSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret, /*options*/) {
    delete ret.__v;
    delete ret._id;
  },
})

artistSchema.set('toObject', { virtuals: true })

export const Artist = mongoose.model('artist', artistSchema)
