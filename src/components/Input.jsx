export default function Input({
  placeholder,
  value,
  onChange,
  type,
  ...props
}) {
  return (
    <>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
