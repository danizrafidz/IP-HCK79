export default function AuthInput({ label, type, value, setValue }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="fieldset-label text-neutral">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input input-base-300 bg-base-300 btn-sm"
      />
    </div>
  );
}
