import { TimePicker } from "antd";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import dayjs from "dayjs";

const format = 'HH:mm';

interface RHFTimePickerProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const RHFTimePicker: React.FC<RHFTimePickerProps> = ({
  control,
  name,
  label,
  placeholder,
  rules,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <div>
            <label className="pl-4 pb-1 flex justify-start text-[13.5px] text-gray-500">
              {label}
            </label>
            <TimePicker
              placeholder={placeholder}
              className="w-full block py-1.5 rounded-[20px] border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              format={format}
              value={field.value ? dayjs(field.value, format) : null} // Convert the value back to a dayjs object if it exists
              onChange={(value) => {
                const formattedValue = value ? value.format(format) : null;
                field.onChange(formattedValue);
              }}
            />
          </div>
        );
      }}
    />
  );
};

export default RHFTimePicker;