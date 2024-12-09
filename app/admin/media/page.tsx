import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";
import { verifySession } from "@/utils/session";
import { redirect } from "next/navigation";
import MediaList from "./MediaList";
import { Suspense } from "react";
import MediaSkeleton from "@/components/Dashboard/media/MediaSkeleton";
import UploadFloat from "@/components/Dashboard/media/UploadFloat";

const mediaPage = async () => {
  const session = await verifySession();

  if (session && session.role !== "admin") {
    redirect("/");
  }

  return (
    <LayoutDashboard>
      <div className="mb-3">
        <h2>Media</h2>
      </div>
      <Suspense fallback={<MediaSkeleton count={10} />}>
        <MediaList />
      </Suspense>
      <UploadFloat />
    </LayoutDashboard>
  );
};

export default mediaPage;
