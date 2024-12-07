import { Model, Schema, model, models, Document } from "mongoose";

export interface ITheme {
  colors: {
    background: string;
    text: string;
    cardColor: string;
    button: {
      background: string;
      text: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    bannerImage: string;
    heroColorTitle: string;
    heroColorSubtitle: string;
  };
}

interface IThemeModel extends Model<IThemeDoc> {
  build(attrs: ITheme): IThemeDoc;
}

interface IThemeDoc extends Document, ITheme {
  createdAt?: string;
  updatedAt?: string;
}

const homeThemeSchema = new Schema<IThemeDoc, IThemeModel>(
  {
    colors: {
      background: { type: String, required: true, trim: true },
      text: { type: String, required: true, trim: true },
      cardColor: { type: String, required: true, trim: true },
      button: {
        background: { type: String, required: true, trim: true },
        text: { type: String, required: true, trim: true },
      },
    },
    hero: {
      title: { type: String, required: true, trim: true, maxlength: 150 },
      subtitle: { type: String, required: true, trim: true, maxlength: 250 },
      bannerImage: { type: String, required: true },
      heroColorTitle: { type: String, required: true, trim: true },
      heroColorSubtitle: { type: String, required: true, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

homeThemeSchema.statics.build = (attrs: ITheme) => {
  return new HomeTheme(attrs);
};

homeThemeSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const HomeTheme = (models.HomeTheme ||
  model<IThemeDoc, IThemeModel>("HomeTheme", homeThemeSchema)) as IThemeModel;

export default HomeTheme;
