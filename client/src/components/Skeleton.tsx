export default function Skeleton() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <div className="bg-slate-700 w-9 h-9 md:w-16 md:h-16 rounded-full flex-shrink-0 placeholder animate-pulse"></div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-700 h-4 w-14 md:w-32 placeholder animate-pulse rounded-md"></div>
            <div className="bg-slate-700 h-4  w-16 md:w-40 placeholder animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end justify-end">
          <div className="flex gap-4 items-center">
            <div className="bg-slate-700  w-9 h-9 md:w-16 md:h-16 rounded-full flex-shrink-0 placeholder animate-pulse"></div>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-700 h-4 w-14 md:w-32 placeholder animate-pulse rounded-md"></div>
              <div className="bg-slate-700 h-4 w-16 md:w-40 placeholder animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="bg-slate-700 w-9 h-9 md:w-16 md:h-16 rounded-full flex-shrink-0 placeholder animate-pulse"></div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-700 h-4 w-14 md:w-32 placeholder animate-pulse rounded-md"></div>
            <div className="bg-slate-700 h-4 w-16 md:w-40 placeholder animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end justify-end">
          <div className="flex gap-4 items-center">
            <div className="bg-slate-700 w-9 h-9 md:w-16 md:h-16 rounded-full flex-shrink-0 placeholder animate-pulse"></div>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-700 h-4 w-14 md:w-32 placeholder animate-pulse rounded-md"></div>
              <div className="bg-slate-700 h-4 w-16 md:w-40 placeholder animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
