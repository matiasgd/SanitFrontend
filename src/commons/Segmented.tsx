import { Radio } from "antd";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import {
  CarryOutTwoTone,
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
          <Radio.Group
            {...field}
            size="large"
            onChange={field.onChange}
            buttonStyle="solid"
          >
            <Radio.Button value="consultas">
              <CarryOutTwoTone className="mr-2" />
              Aumentar mis Consultas
            </Radio.Button>
            <Radio.Button value="ingresos">
              <DollarTwoTone className="mr-2" />
              Aumentar mis Ingresos
            </Radio.Button>
            <Radio.Button value="metricas">
              <FundTwoTone className="mr-2" />
              Obtener Métricas
            </Radio.Button>
            <Radio.Button value="time">
              <DashboardTwoTone className="mr-2" />
              Optimizar mi Tiempo
            </Radio.Button>
          </Radio.Group>
        );
      }}
    />
  );
};

export default CustomSegmented;
