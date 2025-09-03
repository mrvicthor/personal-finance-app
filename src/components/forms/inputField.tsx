export type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  value?: number | string | undefined;
  placeholder?: string;
  error?: string;
  type: string;
};

const InputField = ({
  id,
  label,
  name,
  value,
  placeholder,
  error,
  type,
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
        type={type}
        placeholder={placeholder}
        required
      />
      {error && (
        <span aria-live="polite" className="text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
