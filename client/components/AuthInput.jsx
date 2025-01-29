export default function AuthInput({ label, type }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="fieldset-label text-neutral">{label}</label>
      <input type={type} className="input input-base-300 bg-base-300 btn-sm" />
    </div>
  );
}
