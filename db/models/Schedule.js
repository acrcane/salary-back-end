import { Schema, model } from 'mongoose';

const shiftSchema = new Schema(
  {
    doctor: { type: String, required: true },
    assistant: { type: String, required: true },
    startShift: { type: String, required: true },
    endShift: { type: String, required: true },
  },
  { versionKey: false }
);

const daySchema = new Schema(
  {
    date: { type: Date, required: true },
    shifts: { type: [shiftSchema], default: [] },
  },
  { versionKey: false }
);

const scheduleSchema = new Schema(
  {
    month: { type: String, required: true },
    year: { type: Number, required: true },

    days: {
      type: [daySchema],
      default: [],
    },

    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'draft',
    },
    company: { type: String },
  },
  { versionKey: false }
);

export const Schedule = model('schedule', scheduleSchema);
