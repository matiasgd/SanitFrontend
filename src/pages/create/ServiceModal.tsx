import { useState } from "react";
import { useSelector } from "react-redux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "../../store/store";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import CustomSelect from "../../commons/Select";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import Axios from "axios";
import PricesForm from "../Me/prices/components/PricesForm";
import clsx from "clsx";

interface ServiceModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      duration: "",
      type: "",
      currency: "",
      price: "",
      category: "",
      insurance: "",
      description: "",
      doctor: doctorId,
    },
  });

  const category = watch("category");

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      customMessage("success", "Consultorio guardado con éxito.");
      Axios.post(`http://localhost:3001/api/services/new/${doctorId}`, data);
    } catch (error) {
      customMessage("error", "Algo salió mal.");
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center">
        <p className="text-md font-semibold">Nuevo servicio</p>
      </div>
      <form
        onSubmit={handleSubmit(submitModal)}
        className="flex flex-col w-full"
      >
        <div className="pb-5 pt-5 border border-blue-200 rounded-[20px] mt-5 p-2">
          <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
            <p className="text-sm font-semibold">Datos Generales</p>
          </div>
          <div className="flex m-5 gap-2">
            <div style={{ flex: 2 }}>
              <Input
                id="serviceName"
                label="Nombre del servicio"
                placeholder=""
                type="text"
                register={register}
                errors={errors}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                id="hours"
                label="horas"
                placeholder=""
                type="number"
                register={register}
                errors={errors}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                id="minutes"
                label="minutos"
                placeholder=""
                type="number"
                register={register}
                errors={errors}
                onInput={(e) => {
                  const value = parseInt(e.currentTarget.value, 10);
                  if (value > 60) {
                    e.currentTarget.value = "60"; // Establece el valor máximo a 60
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col m-5">
            <CustomSelect
              label="Categoria"
              placeholder=""
              control={control}
              name="category"
              options={[
                { value: "Without insurance", label: "Particular" },
                { value: "union insurance", label: "Obra social" },
                { value: "private insurance", label: "Prepaga" },
                ,
              ]}
            />
          </div>
          {category !== "Without insurance" && (
            <div className="flex flex-col m-5">
              <CustomSelect
                label="Nombre del seguro"
                placeholder=""
                control={control}
                name="insurance"
                options={[
                  { value: "OSDE", label: "OSDE" },
                  { value: "Swiss medical", label: "Swiss medical" },
                  { value: "Medicus", label: "Medicus" },
                  ,
                ]}
              />
            </div>
          )}
          <div className="flex flex-col m-5">
            <CustomSelect
              label="tipo de servicio"
              placeholder=""
              control={control}
              name="type"
              options={[
                { value: "In person", label: "Presencial" },
                { value: "Online", label: "Virtual" },
                { value: "Both", label: "Ambos" },
                ,
              ]}
            />
          </div>
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
          </div>
          {openPrice && (
            <div className="flex justify-center items-center m-3 ">
              <div className="flex items-center justify-between border border-blue-200 rounded-[20px] mt-5 p-2">
                <PricesForm />
              </div>
            </div>
          )}
          <div className="mt-4 flex items-center justify-end">
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
