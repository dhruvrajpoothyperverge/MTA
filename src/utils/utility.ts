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
