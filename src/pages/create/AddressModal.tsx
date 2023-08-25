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

interface AddressModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
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
      street: "",
      number: "",
      floor: "",
      addressType: "",
      webAddress: "",
      houseApartment: "",
      province: "",
      country: "",
      city: "",
      zipCode: "",
    },
  });

  const addressType = watch("addressType");

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      customMessage("success", "Consultorio guardado con éxito.");
      Axios.post(
        `http://localhost:3001/api/addresses/new/doctor/${doctorId}`,
        data
      );
    } catch (error) {
      customMessage("error", "Algo salió mal.");
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center m-3 ">
        <p className="text-md font-semibold">Nuevo consultorio</p>
      </div>
      <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
        <p className="text-sm font-semibold">Datos Generales</p>
      </div>
      <form
        onSubmit={handleSubmit(submitModal)}
        className="flex flex-col w-full"
      >
        <div>
          <div className=" border border-blue-200 rounded-[20px] mt-5 p-2">
            <div className="flex flex-col m-5">
              <CustomSelect
                label="Tipo de dirección"
                placeholder="Seleccione una opción"
                control={control}
                name="addressType"
                options={[
                  { value: "physical office", label: "Direccion fisica" },
                  { value: "virtual office", label: "Direccion virtual" },
                ]}
              />
            </div>
            {addressType === "physical office" && (
              <>
                <div className="flex m-5">
                  <Input
                    id="addressName"
                    label="Nombre del consultorio"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-row items-center justify-between m-5">
                  <Input
                    id="country"
                    label="Pais"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    id="province"
                    label="Provincia"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-row items-center justify-between m-5">
                  <Input
                    id="city"
                    label="Ciudad"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    id="county"
                    label="Localidad"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-row items-center justify-between m-5">
                  <Input
                    id="street"
                    label="Calle"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    id="number"
                    label="Numero"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col m-5">
                  <CustomSelect
                    label="Casa o departamento"
                    placeholder=""
                    control={control}
                    name="houseApartment"
                    options={[
                      { value: "House", label: "Casa" },
                      { value: "Appartment", label: "Departamento" },
                    ]}
                  />
                </div>
                <div className="flex flex-row items-center justify-between m-5">
                  <Input
                    id="floor"
                    label="Piso"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    id="zipCode"
                    label="Codigo postal"
                    placeholder=""
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>
              </>
            )}
            {addressType === "virtual office" && (
              <div className="flex flex-col items-center justify-between w-[100%]">
                <Input
                  id="addressName"
                  label="Nombre del consultorio"
                  placeholder=""
                  type="text"
                  register={register}
                  errors={errors}
                />
                <Input
                  id="webAddress"
                  label="Direccion web"
                  placeholder=""
                  type="text"
                  register={register}
                  errors={errors}
                />
              </div>
            )}
          </div>
          {addressType && (
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
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AddressModal;
