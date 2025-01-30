export default function HTGLogo({ styles }) {
  return (
    <div className={`flex tracking-widest gap-2 ${styles}`}>
      <img className="w-6 h-6" src="./src/assets/img/hackthegrid.png" />
      <div className="flex">
        <p className="font-bold">HACK</p>
        <p className="font-thin">THE</p>
        <p className="font-bold">GRID</p>
      </div>
    </div>
  );
}
