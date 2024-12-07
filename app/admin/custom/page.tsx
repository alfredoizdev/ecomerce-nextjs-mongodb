import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomHome from "@/app/admin/custom/CustomHome";
import { Suspense } from "react";
import UpdateHomeThemeSkeleton from "@/components/Dashboard/UpdateThemeHomeSkeleton";
import ResetTheme from "./ResetTheme";

const CustomPage = async () => {
  return (
    <LayoutDashboard>
      <Card className="overflow-auto">
        <CardHeader className="flex flex-auto flex-row align-middle justify-between">
          <h2 className="m-0 b-0">Custom Theme</h2>
          <ResetTheme />
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="homepage" className="w-full">
            <TabsList>
              <TabsTrigger value="homepage">Custom Theme</TabsTrigger>
              <TabsTrigger value="collection">collection</TabsTrigger>
            </TabsList>
            <TabsContent value="homepage">
              <Suspense fallback={<UpdateHomeThemeSkeleton />}>
                <CustomHome />
              </Suspense>
            </TabsContent>
            <TabsContent value="collection">
              Change your password here.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </LayoutDashboard>
  );
};

export default CustomPage;
