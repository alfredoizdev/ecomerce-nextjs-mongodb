import { getGendersAction } from "@/actions/gender";
import NotFoundText from "@/components/ui/NotFoundText";
import DeleteGender from "./DeleteGender";

const GenderList = async () => {
  const { data } = await getGendersAction();

  if (!data) return <NotFoundText text="Gender Not Found" />;

  return (
    <div className="flex justify-start items-center">
      {data.map((gender) => (
        <div
          key={gender.id}
          className="py-2 px-2 rounded-md border-2 border-gray-900 m-2 flex items-center justify-center"
        >
          <span>{gender.name}</span>
          <DeleteGender id={gender?.id || ""} />
        </div>
      ))}
    </div>
  );
};

export default GenderList;
