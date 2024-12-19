import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DTOCategory } from "@/types/Category";
import { getCategoryAction } from "@/actions/category";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  const [categories, setcategories] = React.useState<DTOCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategoryAction();
      setcategories(data || []);
    };

    fetchCategories();
  }, []);

  return (
    <Select
      name="category"
      value={value}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.category.toLocaleLowerCase()}
          >
            {category.category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
