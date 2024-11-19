import { useState, useEffect } from "react";
import { BuyTicketContainer, RightArrow } from "mta-components";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import { useFoodContext } from "../../context/FoodContext";
import { useMovieContext } from "../../context/MovieContext";
import { formatTime } from "../../utils/utility";

const BuyTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedMovieTheater, selectedSession } = useBookingContext();
  const { selectedFoodItems } = useFoodContext();
  const { fetchMovieDetails, currentMovie } = useMovieContext();

  useEffect(() => {
    if (id && !currentMovie) {
      fetchMovieDetails(id);
    }
  }, [id, currentMovie]);

  const steps = [1, 2, 3, 4];
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleBackClick = () => {
    if (currentStep === 0) navigate(`/moviedetails/${currentMovie?._id}`);
    else setCurrentStep((prev) => prev - 1);
  };

  const moveToNext = (step: number) => {
    setCurrentStep(step);
  };

  const selectDivData = [
    {
      text: selectedMovieTheater?.name || "Choose a movie theater *",
      icon: <RightArrow />,
      isSelected: selectedMovieTheater !== null,
      onClick: () => {
        navigate(`/available-theaters/${currentMovie?._id}`);
      },
    },
    {
      text: selectedSession
        ? formatTime(selectedSession?.startTime, selectedSession?.endTime)
        : "Select session *",
      icon: <RightArrow />,
      isSelected: selectedSession !== null,
      onClick: () => {
        navigate(
          `/available-sessions/${currentMovie?._id}/${selectedMovieTheater?._id}`
        );
      },
    },
    {
      text: "Buffet Products",
      icon: <RightArrow />,
      isSelected: selectedFoodItems.length > 0,
      onClick: () => {
        navigate(`/buyfood/${currentMovie?._id}`);
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
          selectedTheater={selectedMovieTheater}
          selectedSession={selectedSession}
        />
      )}
      {currentStep === 1 && <Step2 moveToNext={moveToNext} />}
      {currentStep === 2 && <Step3 moveToNext={moveToNext} />}
      {currentStep === 3 && <Step4 />}
    </BuyTicketContainer>
  );
};

export default BuyTicket;
