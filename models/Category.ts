import { Schema, Document, model, Model, models } from "mongoose";

export interface ICategory {
  category: string;
}

interface ICategoryModel extends Model<ICategoryDoc> {
  build(attrs: ICategory): ICategoryDoc;
}

interface ICategoryDoc extends Document, ICategory {
  createdAt?: string;
  updatedAt?: string;
}

export const genderSchema = new Schema<ICategoryDoc, ICategoryModel>(
  {
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the static `build` method
genderSchema.statics.build = (attrs: ICategory) => {
  return new Category(attrs);
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
const Category = (models.Category ||
  model<ICategoryDoc, ICategoryModel>(
    "Category",
    genderSchema
  )) as ICategoryModel;

export default Category;
