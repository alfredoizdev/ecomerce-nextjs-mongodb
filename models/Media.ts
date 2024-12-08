import { Schema, Document, model, Model, models } from "mongoose";

export interface IMedia {
  publicId: string; // Cloudinary public_id
  secureUrl: string; // Cloudinary secure URL
  resourceType: "image" | "video"; // Type of media (image or video)
  type: "user" | "product" | "hero"; // Entity type this media is associated with
  entityId: string; // ID of the associated entity (userId, productId, etc.)
  alt?: string; // Optional alt text
}

interface IMediaModel extends Model<IMediaDoc> {
  build(attrs: IMedia): IMediaDoc;
}

interface IMediaDoc extends Document, IMedia {
  createdAt?: string;
  updatedAt?: string;
}

const mediaSchema = new Schema<IMediaDoc, IMediaModel>(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    secureUrl: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["image", "video"],
      default: "image",
    },
    type: {
      type: String,
      required: true,
      enum: ["user", "product", "hero"],
    },
    entityId: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
  }
);

// Define the static `build` method
mediaSchema.statics.build = (attrs: IMedia) => {
  return new Media(attrs);
};

// Customize the `toJSON` method
mediaSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

// Check if the model already exists in `models`
const Media = (models.Media ||
  model<IMediaDoc, IMediaModel>("Media", mediaSchema)) as IMediaModel;

export default Media;
