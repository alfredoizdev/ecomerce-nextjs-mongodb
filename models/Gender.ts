import { Schema, Document, model, Model, models } from "mongoose";

export interface IGender {
  name: string;
}

interface IGenderModel extends Model<IGenderDoc> {
  build(attrs: IGender): IGenderDoc;
}

interface IGenderDoc extends Document, IGender {
  createdAt?: string;
  updatedAt?: string;
}

export const genderSchema = new Schema<IGenderDoc, IGenderModel>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the static `build` method
genderSchema.statics.build = (attrs: IGender) => {
  return new Gender(attrs);
};

// Customize the `toJSON` method
genderSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

// Check if the model already exists in `models`
const Gender = (models.Gender ||
  model<IGenderDoc, IGenderModel>("Gender", genderSchema)) as IGenderModel;

export default Gender;
