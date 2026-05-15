import { Schema, model } from 'mongoose';

const vacationSchema = new Schema(
  {
    userName: { type: String, required: true },
    startVacation: { type: Date, required: true },
    endVacation: { type: Date, required: true },
    status: {type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending'}
  },
  { versionKey: false }
);

export const Vacation = model('vacation', vacationSchema);
