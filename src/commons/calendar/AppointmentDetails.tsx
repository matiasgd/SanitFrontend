import React from "react";

interface AppointmentDetailsProps {
  appointment: {
    startTime: string;
    endTime: string;
    title: string;
    subtitle: string;
  };
  onClose: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  onClose,
}) => {
  return (
    <div>
      <h2>Appointment Details</h2>
      <p>
        <strong>Title:</strong> {appointment.title}
      </p>
      <p>
        <strong>Subtitle:</strong> {appointment.subtitle}
      </p>
      <p>
        <strong>Start Time:</strong> {appointment.startTime}
      </p>
      <p>
        <strong>End Time:</strong> {appointment.endTime}
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AppointmentDetails;