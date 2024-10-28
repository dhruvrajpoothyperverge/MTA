import { useState } from "react";
import { BuyTicketContainer, RightArrow } from "mta-components";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step2 from "./Step2";
import Step4 from "./Step4";
import { useNavigate } from "react-router-dom";

const BuyTicket = () => {
  const navigate = useNavigate();

  const steps = [1, 2, 3, 4];
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleBackClick = () => {
    if (currentStep === 0) navigate("/moviedetails/1");
    else setCurrentStep((prev) => prev - 1);
  };

  const moveToNext = (step: number) => {
    setCurrentStep(step);
  };

  const [selectedTheater, setSelectedTheater] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectDivData = [
    {
      text: selectedTheater || "Choose a movie theater *",
      icon: <RightArrow />,
      isSelected: selectedTheater != "",
      onClick: () => {
        if (selectedTheater === "") setSelectedTheater("NY - Cinema Village");
        else setSelectedTheater("");
      },
    },
    {
      text: selectedSession || "Select session *",
      icon: <RightArrow />,
      isSelected: selectedSession != "",
      onClick: () => {
        if (selectedSession == "") setSelectedSession("26 Oct, 8 PM - 11 PM");
        else setSelectedSession("");
      },
    },
    {
      text: "Buffet Products",
      icon: <RightArrow />,
      isSelected: selectedItems.length > 0,
      onClick: () => {
        navigate("/buyfood");
      },
    },
  ];

  return (
    <BuyTicketContainer
      onBackClick={handleBackClick}
      steps={steps}
      currentStep={currentStep}
    >
      {currentStep === 0 && (
        <Step1
          moveToNext={moveToNext}
          selectDivData={selectDivData}
          selectedTheater={selectedTheater}
          selectedSession={selectedSession}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}
      {currentStep === 1 && <Step2 moveToNext={moveToNext} />}
      {currentStep === 2 && <Step3 moveToNext={moveToNext} />}
      {currentStep === 3 && <Step4 />}
    </BuyTicketContainer>
  );
};

export default BuyTicket;
