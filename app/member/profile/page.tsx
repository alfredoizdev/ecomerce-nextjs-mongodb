import { getHomePageThemeaction } from "@/actions/custom";
import { getUserByIdAction, getUserDetailByUserId } from "@/actions/users";
import ProfileEdit from "@/components/forms/profileEdit";
import CustomHeader from "@/components/shared/CustomHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LayoutRegularPage from "@/components/ui/LayoutRegularPage";
import UploadAvatar from "@/components/UploadAvatar/UploadAvatar";
import { THEME_DEFAULT } from "@/constants/theme";
import { verifySession } from "@/utils/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ProfilePage = async () => {
  const session = await verifySession();
  const { data: theme } = await getHomePageThemeaction();
  const { data: user } = await getUserByIdAction(session?.userId as string);
  const { data: userDetail } = await getUserDetailByUserId(
    session?.userId as string
  );

  console.log(userDetail);

  if (!session.userId) {
    redirect("/");
  }

  return (
    <LayoutRegularPage theme={theme} session={session}>
      <CustomHeader theme={theme} title="Product Details" session={session} />
      <div
        style={{
          background: theme?.backgroundBtn || THEME_DEFAULT.backgroundBtn,
          color: theme?.textBtn || THEME_DEFAULT.textBtn,
        }}
        className="w-full py-3 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold">Welcome, {user?.name}!</h2>
      </div>
      <div className="max-w-7xl mx-auto p-5 flex flex-row justify-center items-center w-full">
        <ProfileEdit userDetail={userDetail} user={user} />
        <Link
          href={"/member/profile"}
          className="text-sm bg-red-600 text-gray-200 rounded-sm px-4 py-2"
        >
          Cancel Account
        </Link>
      </div>

      <section className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center">
            <UploadAvatar avatar={user?.avatar} id={user?.id} />
          </div>
          <div
            style={{
              color: theme?.text || THEME_DEFAULT.text,
            }}
            className="flex items-center md:items-start justify-center flex-col"
          >
            <h3 className="text-md font-semibold mb-2 flex items-center">
              <FaEnvelope className="mr-2" />
              {user?.email || "No email provided"}
            </h3>
            <p className="text-lg mb-2 flex items-center">
              <FaPhoneAlt className="mr-2 font-semibold" /> {userDetail?.phone}
            </p>
            <p className="text-lg mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 font-semibold" />
              {userDetail?.address}, {userDetail?.city}, {userDetail?.state},{" "}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h3
            style={{ color: theme?.text || THEME_DEFAULT.text }}
            className="text-xl font-semibold mb-4"
          >
            Order History
          </h3>
          <div className="grid gap-4">
            <ul className="list-none space-y-4">
              <li>
                <Card
                  style={{
                    background: `${
                      theme?.cardColor || THEME_DEFAULT.cardColor
                    }`,
                  }}
                >
                  <CardHeader>
                    <h4
                      style={{ color: theme?.text || THEME_DEFAULT.text }}
                      className="text-lg font-semibold"
                    >
                      Order #1
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-start flex-col">
                      <p style={{ color: theme?.text || THEME_DEFAULT.text }}>
                        Details of the order go here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
              <li>
                <Card
                  style={{
                    background: `${
                      theme?.cardColor || THEME_DEFAULT.cardColor
                    }`,
                  }}
                >
                  <CardHeader>
                    <h4
                      style={{ color: theme?.text || THEME_DEFAULT.text }}
                      className="text-lg font-semibold"
                    >
                      Order #1
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-start flex-col">
                      <p style={{ color: theme?.text || THEME_DEFAULT.text }}>
                        Details of the order go here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
              <li>
                <Card
                  style={{
                    background: `${
                      theme?.cardColor || THEME_DEFAULT.cardColor
                    }`,
                  }}
                >
                  <CardHeader>
                    <h4
                      style={{ color: theme?.text || THEME_DEFAULT.text }}
                      className="text-lg font-semibold"
                    >
                      Order #1
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-start flex-col">
                      <p style={{ color: theme?.text || THEME_DEFAULT.text }}>
                        Details of the order go here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </LayoutRegularPage>
  );
};

export default ProfilePage;
