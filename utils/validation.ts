export const validationsForCampaing = [
  {
    key: "title",
    message: "Title must have at least 3 characters",
    validate: (value: string) => value.length >= 3,
  },
  {
    key: "description",
    message: "Description is required",
    validate: (value: string) => value.trim().length > 0,
  },
  {
    key: "image",
    message: "Image is required",
    validate: (value: string) => value.trim().length > 0,
  },
  {
    key: "page",
    message: "Page is required",
    validate: (value: string) => value.trim().length > 0,
  },
];
