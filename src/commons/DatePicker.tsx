import { DatePicker } from "antd";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import dayjs from "dayjs";

interface RHFDatePickerProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  register?: any;
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({
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
            <label className="block text-sm text-start font-medium leading-6 text-gray-800">
              {label}
            </label>
            <DatePicker
              placeholder={placeholder}
              className="w-full block mt-2 py-1.5"
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date, dateString) => {
                field.onChange(date ? dateString : null);
              }}
            />
          </div>
        );
      }}
    />
  );
};

export default RHFDatePicker;
