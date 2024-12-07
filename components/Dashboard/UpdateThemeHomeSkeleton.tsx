import { Skeleton } from "@/components/ui/skeleton";

const UpdateHomeThemeSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Título del Formulario */}
      <Skeleton className="h-8 w-1/3 rounded-md" />

      {/* Campos del Formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campos de Texto */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-5 w-1/3 mb-2 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>

      {/* Hero Banner */}
      <div>
        <Skeleton className="h-5 w-1/3 mb-2 rounded-md" />
        <Skeleton className="h-[300px] w-full max-w-[600px] rounded-lg" />
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4 mt-6">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default UpdateHomeThemeSkeleton;
