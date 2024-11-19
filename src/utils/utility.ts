export const getSeatLabel = (
  rowIndex: number,
  colIndex: number,
  invalidRows: number[] = [4],
  invalidCols: number[] = [9],
  rowSize: number = 9,
  colSize: number = 12
): string => {
  const validRows = Array.from({ length: rowSize }, (_, i) => i).filter(
    (row) => !invalidRows.includes(row)
  );
  const validCols = Array.from({ length: colSize }, (_, i) => i).filter(
    (col) => !invalidCols.includes(col)
  );

  const actualRowIndex = validRows.indexOf(rowIndex);
  const rowLabel = String.fromCharCode(65 + actualRowIndex);
  const colNumber = validCols.indexOf(colIndex) + 1;

  return `${rowLabel}${colNumber}`;
};

export const formatTime = (
  startIsoString: string,
  endIsoString: string
): string => {
  const startDate = new Date(startIsoString);
  const endDate = new Date(endIsoString);

  const formatSingleTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  const day = startDate.getDate();
  const month = startDate.toLocaleString("default", { month: "short" });

  const startTime = formatSingleTime(startDate);
  const endTime = formatSingleTime(endDate);

  return `${day} ${month}, ${startTime} - ${endTime}`;
};
