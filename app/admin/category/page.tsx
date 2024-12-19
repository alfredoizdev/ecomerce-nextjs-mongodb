import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { Suspense } from "react";
import CategoryList from "./CategoryList";
import AddCategory from "@/components/forms/AddCategory";

const MenusPage = async () => {
  return (
    <LayoutDashboard>
      <Card>
        <CardHeader>
          <h2>Gender</h2>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <p>
              Here you can manage the Categories this will display as menu of
              the collections
            </p>
            <AddCategory />
          </div>
          <hr className="my-3 bg-slate-400" />
          <Suspense fallback={<p>Loading...</p>}>
            <CategoryList />
          </Suspense>
        </CardContent>
      </Card>
    </LayoutDashboard>
  );
};

export default MenusPage;
