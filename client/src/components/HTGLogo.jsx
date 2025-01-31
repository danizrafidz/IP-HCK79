export default function HTGLogo({ styles }) {
  return (
    <div className={`flex tracking-widest gap-2 items-center ${styles}`}>
      <img
        className="w-auto h-6 sm:h-7"
        src="https://res.cloudinary.com/dlo3c5sn7/image/upload/v1738310860/hackthegrid_osol9t.png"
      />
      <div className="flex">
        <p className="font-bold">HACK</p>
        <p className="font-thin">THE</p>
        <p className="font-bold">GRID</p>
      </div>
    </div>
  );
}
