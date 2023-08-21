import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "../../store/store";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import CustomSelect from "../../commons/Select";
import RHFDatePicker from "../../commons/DatePicker";

interface PaymentModalProps {
  appointment: any;
  isOpen?: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  appointment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;
  const appointmentId = appointment._id;
  const currency = appointment.currency;
  const serviceName = appointment.service.serviceName;
  const price = appointment.appointmentPrice;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      appointmentId: appointmentId,
      doctorId: doctorId,
      amount: "",
      currency: currency,
      method: "",
      status: "full",
      date: "",
    },
  });

  const status = watch("status");

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.status === "Full") {
      data.amount = price; // Set the amount to the price when status is Full
    }
    delete data.serviceName;

    await axios
      .post(`http://localhost:3001/api/payments/new`, data)
      .then((res) => {
        const message = res.data.message;
        customMessage("success", message);
      })
      .catch((err) => {
        console.log(err);
        customMessage("error", "Algo salió mal.");
      });

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(submitModal)}>
        <div className="w-full mt-5 gap-3 grid grid-cols-2">
          <CustomSelect
            label="Modalidad"
            placeholder="Seleccione una modalidad"
            control={control}
            name="status"
            options={[
              { value: "Full", label: "Total" },
              { value: "Partial", label: "Parcial" },
            ]}
          />
          <CustomSelect
            label="Modalidad"
            placeholder="Seleccione una modalidad"
            control={control}
            name="method"
            options={[
              { value: "Cash", label: "Efectivo" },
              { value: "DebitCard", label: "Tarjeta de débito" },
              { value: "CreditCard", label: "Tarjeta de crédito" },
              { value: "MercadoPago", label: "Mercado Pago" },
            ]}
          />
        </div>
        <div className="w-full mt-5 gap-3 grid grid-cols-3">
          <RHFDatePicker
            label="Fecha de pago"
            placeholder="Seleccione una fecha"
            control={control}
            name="date"
          />
          <Input
            disabled
            id="serviceName"
            label="Nombre del Servicio"
            placeholder={serviceName}
            type="text"
            register={register}
            errors={errors}
          />
          {status === "Full" ? (
            <Input
              register={register}
              disabled
              id="amount"
              label={`Precio en (${appointment.currency})`}
              placeholder={price} // Set the specific value when "status" is "Full"
              type="string"
              errors={errors}
            />
          ) : (
            <Input
              register={register}
              id="amount"
              label={`Precio en (${appointment.currency})`}
              placeholder="Ingrese el precio"
              type="string"
              {...register("amount")}
              errors={errors}
            />
          )}
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <Button
            disabled={isLoading}
            secondary
            type="button"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancelar
          </Button>
          <Button disabled={isLoading} type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;
