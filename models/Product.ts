import { Product as TProduct } from "@/types/Product";
import { Schema, model, models } from "mongoose";

// Esquema de Producto
const ProductSchema = new Schema<TProduct>(
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

ProductSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

// Exporta el modelo o reutiliza el existente
const Product = models.Product || model<TProduct>("Product", ProductSchema);

export default Product;
