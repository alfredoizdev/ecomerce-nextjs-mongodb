import { TCamp } from "@/types/Camp";
import NotFoundText from "../ui/NotFoundText";
import VariantOne from "./VariantOne";
import VariantTwo from "./VariantTwo";
import VariantThree from "./VariantThree";
import VariantFour from "./VariantFour";

type Props = {
  campaings: TCamp[];
};

const PrintCamp = ({ campaings }: Props) => {
  if (!campaings?.length) {
    return <NotFoundText text="No Campaing Found" />;
  }

  return (
    <>
      {campaings.length === 1 && <VariantOne campaings={campaings} />}
      {campaings.length === 2 && <VariantTwo campaings={campaings} />}
      {campaings.length === 3 && <VariantThree campaings={campaings} />}
      {campaings.length === 4 && <VariantFour campaings={campaings} />}
    </>
  );
};

export default PrintCamp;
