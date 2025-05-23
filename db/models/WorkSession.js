import { Schema, model } from 'mongoose';

const workSessionSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    table: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
    date: { type: Date, default: Date.now },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    duration: { type: Number, required: true },
    salary: { type: Number },
  },
  { versionKey: false }
);

export const WorkSession = model('workSession', workSessionSchema);
