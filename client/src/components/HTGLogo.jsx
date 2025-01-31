export default function HTGLogo({ styles }) {
  return (
    <div className={`flex tracking-widest gap-2 items-center ${styles}`}>
      <img
        className="w-auto h-6 sm:h-7"
        src="./src/assets/img/hackthegrid.png"
      />
      <div className="flex">
        <p className="font-bold">HACK</p>
        <p className="font-thin">THE</p>
        <p className="font-bold">GRID</p>
      </div>
    </div>
  );
}
