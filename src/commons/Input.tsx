import clsx from "clsx";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
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
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="pl-4 pb-1 flex justify-start text-[13.5px] text-gray-500"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={passwordVisible ? "text" : type}
          placeholder={placeholder}
          autoComplete={id}
          disabled={disabled}
          onInput={onInput}
          value={value}
          {...register(id, { required })}
          className={clsx(
            `h-[100%] form-input block w-full rounded-[20px] border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeTwoTone className="text-gray-600 mr-1" />
            ) : (
              <EyeInvisibleOutlined className="text-gray-600 mr-1" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
