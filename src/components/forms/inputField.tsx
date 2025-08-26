type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  value?: number | undefined;
  placeholder?: string;
  error?: string[];
};

const InputField = ({
  id,
  label,
  name,
  value,
  placeholder,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="capitalize text-[#696868] text-xs font-bold"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        defaultValue={value}
        className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
        type="text"
        placeholder={placeholder}
        required
      />
      {error && (
        <p aria-live="polite" className="text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
