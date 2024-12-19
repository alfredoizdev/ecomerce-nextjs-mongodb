import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import AddGender from "@/components/forms/AddGender";
import GenderList from "./GenderList";
import { Suspense } from "react";

const MenusPage = async () => {
  return (
    <LayoutDashboard>
      <Card>
        <CardHeader>
          <h2>Gender</h2>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <p>Here you can manage the Gender list</p>
            <AddGender />
          </div>
          <hr className="my-3 bg-slate-400" />
          <Suspense fallback={<p>Loading...</p>}>
            <GenderList />
          </Suspense>
        </CardContent>
      </Card>
    </LayoutDashboard>
  );
};

export default MenusPage;
