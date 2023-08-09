import patient from "../../../images/patient.png";
import wallet from "../../../images/wallet.png";

const Parallax = () => {
  return (
    <>
      <div
        className="min-h-screen flex justify-center items-center bg-no-repeat bg-fixed bg-center bg-contain"
        style={{
          backgroundImage: `url(${patient})`,
        }}
      >
        <p className="text-center text-blue-500 font-black text-5xl">
          Paciente
        </p>
      </div>

      <div className="p-10 flex flex-col gap-y-5 text-center">
        <p className="text-blue-500 font-black text-4xl">
          Administra Pacientes
        </p>
        <p className="font-bold text-md">
          Visualiza los datos, consultas y status de pagos de cada uno de tus
          pacientes de manera clara y consisa.
        </p>
      </div>

      <div
        className="min-h-screen flex justify-center items-center bg-no-repeat bg-fixed bg-center bg-contain"
        style={{
          backgroundImage: `url(${wallet})`,
        }}
      >
        <p className="text-center text-blue-500 font-black text-5xl">Wallet</p>
      </div>
      <div className="p-10 flex flex-col gap-y-5 text-center">
        <p className="text-blue-500 font-black text-4xl">
          Administra tus Ingresos
        </p>
        <p className="font-bold text-md">
          Visualiza el historial de ingresos efectivos y pendientes en varias
          divisas. Toma decisiones de negocio inteligentes en base a métricas
          comparativas constantemente actualizadas.
        </p>
      </div>
    </>
  );
};

export default Parallax;
