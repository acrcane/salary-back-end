import { Schema, model } from 'mongoose';

const tableSchema = new Schema(
  {
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open', 'close'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
    closedAt: { type: Date, default: null },
  },
  { versionKey: false }
);

tableSchema.virtual('workSession', {
  ref: 'workSession',
  localField: '_id',
  foreignField: 'table',
})

tableSchema.set('toObject', { virtuals: true });
tableSchema.set('toJSON', { virtuals: true });

export const Table = model('table', tableSchema);
