import { Model, Schema, model, models, Document } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  discountPercentage: number;
  category: string;
  gender: string;
  inStock: string;
  details: {
    material: string;
    sole: string;
    weight: string;
    colors: string[];
    sizes: string[];
  };
}

interface IProductModel extends Model<IProductDoc> {
  build(attrs: IProduct): IProductDoc;
}

interface IProductDoc extends Document, IProduct {
  createdAt?: string;
  updatedAt?: string;
}

const productSchema = new Schema<IProductDoc, IProductModel>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 1000 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    discountPercentage: {
      type: Number,
      required: false,
      min: 0,
      max: 100,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["Running", "Casual", "Hiking", "Boots", "Sportswear"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["man", "women", "unisex"],
    },
    inStock: { type: String, required: true, default: "in" },
    details: {
      material: { type: String, required: true },
      sole: { type: String, required: true },
      weight: { type: String, required: true },
      colors: { type: [String], required: true },
      sizes: { type: [String], required: true },
    },
  },
  {
    timestamps: true,
  }
);

productSchema.statics.build = (attrs: IProduct) => {
  return new Product(attrs);
};

productSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Product = (models.Product ||
  model<IProductDoc, IProductModel>("Product", productSchema)) as IProductModel;

export default Product;
