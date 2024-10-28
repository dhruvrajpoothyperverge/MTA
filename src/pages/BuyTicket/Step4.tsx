import { PaymentStatus } from "mta-components";
import { useNavigate } from "react-router-dom";

const Step4 = () => {
  const navigate = useNavigate();
  return (
    <PaymentStatus
      status="success"
      onGoHome={() => navigate("/home")}
      onTryAgain={() => navigate("/home")}
      onViewTicket={() => navigate("/bookingdetails/1")}
    />
  );
};

export default Step4;
