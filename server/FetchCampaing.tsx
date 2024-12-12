import { getCampsAction } from "@/actions/camp";
import PrintCamp from "@/components/PrintCamp/PrintCamp";

const FetchCampaing = async () => {
  const { results } = await getCampsAction();

  return (
    <div>
      <PrintCamp campaings={results} />
    </div>
  );
};

export default FetchCampaing;
