import { Segmented } from "antd";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  CalendarTwoTone,
  DashboardTwoTone,
  DollarTwoTone,
  FundTwoTone,
} from "@ant-design/icons";

interface SegmentedProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
  register?: any;
}

const CustomSegmented: React.FC<SegmentedProps> = ({
  control,
  name,
  rules,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <Segmented
            {...field}
            size="large"
            onChange={field.onChange}
            className="block rounded-md border-0 mt-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            options={[
              {
                label: "Aumentar mis Consultas",
                value: "Aumentar mis Consultas",
                icon: <CalendarTwoTone />,
              },
              {
                label: "Aumentar mis Ingresos",
                value: "Aumentar mis Ingresos",
                icon: <DollarTwoTone />,
              },
              {
                label: "Obtener Métricas",
                value: "Obtener Métricas",
                icon: <FundTwoTone />,
              },
              {
                label: "Optimizar mi Tiempo",
                value: "Optimizar mi Tiempo",
                icon: <DashboardTwoTone />,
              },
            ]}
          />
        );
      }}
    />
  );
};

export default CustomSegmented;
