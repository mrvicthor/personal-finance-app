import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
        <RadioGroup name={name} defaultValue="false" className="flex mt-2">
          {radioOptions.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default RadioInputField;
