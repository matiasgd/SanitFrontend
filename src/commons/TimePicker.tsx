import { TimePicker } from "antd";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import moment, { Moment } from "moment";

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
              format="HH:mm" // Set the format to show only hours and minutes
              value={field.value ? moment(field.value, "HH:mm") : undefined}
              onChange={(time: Moment | null) => {
                // Format the selected time as "HH:mm" and update the field value
                const formattedTime = time ? time.format("HH:mm") : "";
                field.onChange(formattedTime);
              }}
            />
          </div>
        );
      }}
    />
  );
};

export default RHFTimePicker;
