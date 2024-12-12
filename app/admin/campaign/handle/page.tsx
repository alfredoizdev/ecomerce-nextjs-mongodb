import { getCampsAction } from "@/actions/camp";
import CustomCamp from "@/components/forms/CustomCamp";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import Link from "next/link";

const AddCampPage = async () => {
  const { results } = await getCampsAction();

  return (
    <LayoutDashboard>
      <Card className="overflow-auto">
        <CardHeader className="flex flex-auto flex-row align-middle justify-between">
          <h2 className="m-0 b-0">Handle Campaing</h2>
          <Link
            className="bg-red-600 text-stone-100 px-4 py-2 rounded-md"
            href="/admin/campaign"
          >
            {results.length ? "Go Back" : "cancel"}
          </Link>
        </CardHeader>
        <hr className="bg-gray-500 mb-8" />
        <CardContent>
          <CustomCamp campaings={results} />
        </CardContent>
      </Card>
    </LayoutDashboard>
  );
};

export default AddCampPage;
