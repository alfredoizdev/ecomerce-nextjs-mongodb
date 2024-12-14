import { getHomePageThemeaction } from "@/actions/custom";
import { getSession } from "@/utils/session";
import LayoutRegularPage from "../ui/LayoutRegularPage";

const Profile = async () => {
  const session = await getSession();
  const { data } = await getHomePageThemeaction();

  return (
    <LayoutRegularPage theme={data} session={session}>
      <h2>Profile</h2>
    </LayoutRegularPage>
  );
};

export default Profile;
