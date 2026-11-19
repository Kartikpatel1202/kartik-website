/**
 * Site-wide ambient layer: two soft, static radial glows plus a fine grain. Fixed behind all
 * content, invisible to assistive tech. (The glows used to drift forever; removed in Phase 8.)
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[25vh] -right-[15vw] h-[80vh] w-[70vw] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgb(201 191 240 / 0.09), rgb(201 191 240 / 0.025) 55%, transparent)",
        }}
      />
      <div
        className="absolute -bottom-[30vh] -left-[20vw] h-[85vh] w-[75vw] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgb(243 242 245 / 0.05), rgb(243 242 245 / 0.015) 55%, transparent)",
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
