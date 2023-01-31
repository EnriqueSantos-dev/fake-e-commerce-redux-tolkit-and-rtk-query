/* eslint-disable react/no-array-index-key */
export function SkeletonCardProducts() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={`s-${index}`} className="mx-auto flex w-full max-w-xs flex-col rounded-lg bg-gray-50 px-6 py-8 shadow-lg transition-transform duration-200 hover:scale-105">
          <div className="relative flex h-56 items-center justify-center overflow-hidden">
            <div
              className="flex-1 h-[inherit] rounded object-contain bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
            />
          </div>
          <div className="space-y-1">
            <p className="rounded mt-2 text-xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-3 overflow-hidden"><span className="invisible">hello</span></p>
            <p className="rounded mt-2 text-xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-3 overflow-hidden"><span className="invisible">hello</span></p>
          </div>
          <p className="rounded mt-3 text-xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-7 w-20 overflow-hidden"><span className="invisible">hello</span></p>
          <div className="mt-4 flex items-stretch gap-3">
            <div
              className="h-10 w-full flex-1 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
            />
            <div
              className="rounded-md border transition-opacity w-10 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
            >
              <div className="h-full w-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
