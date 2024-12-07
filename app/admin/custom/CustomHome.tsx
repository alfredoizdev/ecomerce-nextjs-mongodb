import { getHomePageThemeaction } from "@/actions/custom";
import UpdateHomeThemeForm from "@/components/Dashboard/UpdateHomeThemeForm";

const CustomHome = async () => {
  const { data } = await getHomePageThemeaction();

  return (
    <div
      style={{
        overflow: "visible",
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <UpdateHomeThemeForm initialState={data} />
    </div>
  );
};

export default CustomHome;
