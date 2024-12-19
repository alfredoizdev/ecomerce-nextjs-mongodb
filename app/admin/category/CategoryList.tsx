import NotFoundText from "@/components/ui/NotFoundText";
import { getCategoryAction } from "@/actions/category";
import DeleteCategory from "./DeleteCategory";

const CategoryList = async () => {
  const { data } = await getCategoryAction();

  if (!data) return <NotFoundText text="Category Not Found" />;

  return (
    <div className="flex justify-start items-center">
      {data.map((gender) => (
        <div
          key={gender.id}
          className="py-2 px-2 rounded-md border-2 border-gray-900 m-2 flex items-center justify-center"
        >
          <span>{gender.category}</span>
          <DeleteCategory id={gender?.id || ""} />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
