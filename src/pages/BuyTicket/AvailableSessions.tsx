import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import { useBookingContext, Session } from "../../context/BookingContext";
import toast from "react-hot-toast";
import { Button, LeftArrow, DatePicker, SessionList } from "mta-components";

const AvailableSessions: React.FC = () => {
  const { id, movieid } = useParams();
  const navigate = useNavigate();
  const { currentMovie, fetchMovieDetails } = useMovieContext();
  const {
    selectedMovieTheater,
    selectedSession,
    availableSessions,
    fetchAvailableSessions,
    handleSelectSession,
    loading,
  } = useBookingContext();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleDateString("en-CA")
  );

  useEffect(() => {
    if (movieid && !currentMovie) {
      fetchMovieDetails(movieid);
    }
  }, [movieid, currentMovie]);

  useEffect(() => {
    if (!selectedMovieTheater) toast.error("Select movie theater first");
    else {
      if (id && movieid && selectedDate) {
        fetchAvailableSessions(movieid, id, selectedDate);
      }
    }
  }, [movieid, id, selectedDate]);

  const handleSessionSelect = useCallback(
    (session: Session) => {
      handleSelectSession(session);
      navigate(`/buyticket/${currentMovie?._id}`);
    },
    [currentMovie, handleSelectSession, navigate]
  );

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const dateList = useMemo(() => {
    const currentDate = new Date();
    const dateArray = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + i);
      const formattedDate = newDate.toLocaleDateString("en-CA");
      dateArray.push(formattedDate);
    }

    return dateArray;
  }, []);

  return (
    <div className="flex flex-col gap-4 p-5 text-white">
      <Button
        variant="tertiary"
        icon={<LeftArrow />}
        className="!w-11 !h-11"
        onClick={() => navigate(-1)}
      />

      <h2>Select a Session</h2>

      <DatePicker
        dateList={dateList}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      {selectedDate && (
        <SessionList
          selectedSession={selectedSession}
          availableSessions={availableSessions}
          onSessionSelect={handleSessionSelect}
          loading={loading}
        />
      )}

      {!loading && selectedDate && availableSessions.length === 0 && (
        <p>No available sessions for this date.</p>
      )}
    </div>
  );
};

export default AvailableSessions;
