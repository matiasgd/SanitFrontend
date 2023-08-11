import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  placeholder?: string;
  value?: number;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  id,
  placeholder,
  type,
  required,
  register,
  errors,
  disabled,
  onInput,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="pl-4 pb-1 flex justify-start text-[13.5px]  text-gray-500 "
      >
        {label}
      </label>
      <div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={id}
          disabled={disabled}
          onInput={onInput}
          defaultValue={value}
          {...register(id, { required })}
          className={clsx(
            `h-[100%] form-input block w-full rounded-[20px] border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
