import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "../../store/store";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import PricesForm from "../Me/prices/components/PricesForm";
import clsx from "clsx";
import CustomSelect from "../../commons/Select";
import RHFDatePicker from "../../commons/DatePicker";

interface ServiceModalProps {
  addressData: any;
  isOpen?: boolean;
  onClose: () => void;
  type: string;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  addressData,
  isOpen,
  onClose,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      serviceName: "",
      description: "",
      address: "",
      hours: "",
      minutes: "",
      currency: "ARS",
      priceValue: "",
      priceDuration: "",
      priceInitialDate: "",
      doctor: doctorId,
    },
  });

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    await axios
      .post(`http://localhost:3001/api/services/new/${doctorId}`, data)
      .then(() => customMessage("success", "Servicio creado!"))
      .catch((err) => {
        console.log(err);
        customMessage("error", "Algo salió mal.");
      });

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center">
        <p className="text-md font-semibold">
          {type === "CREATE" && "Nuevo Servicio"}
          {type === "UPDATE" && "Actualizar Servicio"}
        </p>
      </div>
      <form onSubmit={handleSubmit(submitModal)}>
        <div className="w-full mt-5 grid grid-cols-2">
          <Input
            id="serviceName"
            label="Nombre del Servicio"
            placeholder="Ej. Consulta Psicológica"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="description"
            label="Descripción"
            placeholder="Descripcion del servicio"
            type="text"
            register={register}
            errors={errors}
          />
          <CustomSelect
            label="Consultorio"
            placeholder="Seleccione su consultorio"
            control={control}
            name="address"
            options={
              Array.isArray(addressData)
                ? [
                    { value: null, label: "Todos" }, // Agregar "Todos" como una opción adicional
                    ...addressData.map((address: any) => ({
                      value: address._id,
                      label: address.addressName,
                    })),
                  ]
                : [{ value: null, label: "Todos" }]
            }
          />
          <Input
            id="hours"
            label="Horas"
            placeholder="1,2,3..."
            type="number"
            register={register}
            errors={errors}
            onInput={(e) => {
              const value = parseInt(e.currentTarget.value, 10);
              if (value > 12) {
                e.currentTarget.value = "12";
              }
              if (value < 0) {
                e.currentTarget.value = "0";
              }
            }}
          />
          <Input
            id="minutes"
            label="Minutos"
            placeholder="20, 30..."
            type="number"
            register={register}
            errors={errors}
            onInput={(e) => {
              const value = parseInt(e.currentTarget.value, 10);
              if (value > 60) {
                e.currentTarget.value = "59";
              }
              if (value < 0) {
                e.currentTarget.value = "0";
              }
            }}
          />
          <Input
            disabled
            id="currency"
            label="Moneda"
            placeholder="ARS"
            type="number"
            register={register}
            errors={errors}
          />
          {type === "CREATE" && (
            <>
              <Input
                id="priceValue"
                label="Importe"
                placeholder="5000"
                type="number"
                register={register}
                errors={errors}
                onInput={(e) => {
                  const value = parseInt(e.currentTarget.value, 10);
                  if (value < 1) {
                    e.currentTarget.value = "1";
                  }
                }}
              />
              <CustomSelect
                label="Duración"
                placeholder="Seleccione una opción"
                control={control}
                name="priceDuration"
                options={[
                  { value: 10, label: "10 días" },
                  { value: 15, label: "15 días" },
                  { value: 30, label: "30 días" },
                  { value: 45, label: "45 días" },
                  { value: 60, label: "60 días" },
                  { value: 120, label: "120 días" },
                  { value: 360, label: "1 año" },
                ]}
              />
              <RHFDatePicker
                label="Desde"
                placeholder="Seleccione una fecha"
                control={control}
                name="priceInitialDate"
              />
            </>
          )}
          {type === "UPDATE" && (
            <div className="flex justify-center items-center m-3 ">
              <button
                type="button"
                className={clsx(
                  "flex justify-center items-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  "bg-blue-400 hover:bg-blue-500 focus-visible:outline-blue-500"
                )}
                onClick={() => {
                  setOpenPrice(!openPrice);
                }}
              >
                (+) Nuevo precio
              </button>
              {openPrice && (
                <div className="flex justify-center items-center m-3 ">
                  <div className="flex items-center justify-between border border-blue-200 rounded-[20px] mt-5 p-2">
                    <PricesForm />
                  </div>
                </div>
              )}
            </div>
          )}

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
        </div>
      </form>
    </Modal>
  );
};

export default ServiceModal;
