import { Schema, model } from 'mongoose';

const procedureSessionSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    workSession: {
      type: Schema.Types.ObjectId,
      ref: 'worksession',
      required: true,
    },
    procedureName: {
      type: String,
      enum: ['Professional hygiene', 'Whitening', 'Scanning', 'Suture removal'],
      required: true,
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    earning: { type: Number, required: true },
  },
  { versionKey: false }
);

export const ProcedureSession = model('procedure', procedureSessionSchema);
