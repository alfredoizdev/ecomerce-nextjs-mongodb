import { Schema, Document, model, Model, models } from "mongoose";

export interface IUserDetail {
  user: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface IUserDetailModel extends Model<IUserDetailDoc> {
  build(attrs: IUserDetail): IUserDetailDoc;
}

interface IUserDetailDoc extends Document, IUserDetail {
  createdAt?: string;
  updatedAt?: string;
}

export const userDetailSchema = new Schema<IUserDetailDoc, IUserDetailModel>(
  {
    user: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the static `build` method
userDetailSchema.statics.build = (attrs: IUserDetail) => {
  return new UserDetail(attrs);
};

// Customize the `toJSON` method
userDetailSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

// Check if the model already exists in `models`
const UserDetail = (models.UserDetail ||
  model<IUserDetailDoc, IUserDetailModel>(
    "UserDetail",
    userDetailSchema
  )) as IUserDetailModel;

export default UserDetail;
