import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PrintCamp from "@/components/PrintCamp/PrintCamp";

import Link from "next/link";
import { getCampsAction } from "@/actions/camp";
import NotFoundText from "@/components/ui/NotFoundText";

const CampaignPage = async () => {
  const { results } = await getCampsAction();

  return (
    <LayoutDashboard>
      <Card className="overflow-auto">
        <CardHeader className="flex flex-auto flex-row align-middle justify-between">
          <h2 className="m-0 b-0">Campaing</h2>
          <Link
            className="bg-slate-900 text-stone-100 px-4 py-2 rounded-md"
            href="/admin/campaign/handle"
          >
            {results.length !== 0 ? "Edit Campaigns" : "Create Campaigns"}
          </Link>
        </CardHeader>
        <CardContent>
          {results.length !== 0 ? (
            <PrintCamp campaings={results} />
          ) : (
            <div className="my-6">
              <NotFoundText text="No Campaigns Found create your first one" />
            </div>
          )}
        </CardContent>
      </Card>
    </LayoutDashboard>
  );
};

export default CampaignPage;
