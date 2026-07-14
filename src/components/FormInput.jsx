function FormInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      className="form-control form-input-cineflix bg-secondary bg-opacity-25 text-white border-0"
    />
  );
}

export default FormInput;