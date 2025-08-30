type RadioInputFieldProps = {
  name: string;
  label: string;
};

const radioOptions = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];
const RadioInputField = ({ name, label }: RadioInputFieldProps) => {
  return (
    <>
      <div className="flex flex-col space-x-2">
        <label
          htmlFor={name}
          className="capitalize text-[#696868] text-xs font-bold"
        >
          {label}
        </label>
        <div className="flex space-x-4">
          {radioOptions.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                defaultChecked={option.value === "false"}
                className="w-4 h-4 accent-black border-gray-300 focus:ring-gray-500"
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-sm font-medium text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RadioInputField;
