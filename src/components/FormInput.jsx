function FormInput({
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-control form-input-cineflix bg-secondary bg-opacity-25 text-white border-0"
      required
    />
  );
}

export default FormInput;