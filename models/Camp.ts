import { Schema, Document, model, Model, models } from "mongoose";

export interface ICamp {
  title: string;
  description: string;
  image: string;
  page: string;
  startDate: string;
  endDate: string;
  color: string;
  publicImageId?: string;
}

interface ICampDoc extends Document, ICamp {}

interface ICampModel extends Model<ICampDoc> {
  build(attrs: ICamp): ICampDoc;
}

const campSchema = new Schema<ICampDoc, ICampModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    page: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#9900ef",
    },
    publicImageId: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Agrega el método `build` al esquema
campSchema.statics.build = (attrs: ICamp) => {
  return new Camp(attrs);
};

// Personaliza el método `toJSON`
campSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

// Si el modelo ya existe, usa `models.Camp`, de lo contrario, crea uno nuevo
const Camp =
  models.Camp ||
  (model<ICampDoc, ICampModel>("Camp", campSchema) as ICampModel);

export default Camp;
