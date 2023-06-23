import { Select } from "antd";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface SelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  register?: any;
  options: { value: string; label: string }[];
}

const CustomSelect: React.FC<SelectProps> = ({
  control,
  name,
  label,
  placeholder,
  rules,
  options,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <div>
            <label className="block text-sm text-start font-medium leading-6 text-gray-800">
              {label}
            </label>
            <Select
              {...field}
              placeholder={placeholder}
              onChange={field.onChange}
              className="block w-full rounded-md border-0 mt-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              options={options}
            />
          </div>
        );
      }}
    />
  );
};

export default CustomSelect;
