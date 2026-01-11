import { TableRow, TableCell, Skeleton, Box } from "@mui/material";

interface Props {
  rows?: number;
  columns?: number; // new prop
}

const TableSkeleton = ({ rows = 5, columns = 4 }: Props) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} sx={{ "& td": { outline: "none" } }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              {colIndex === 0 ? (
                <Box display="flex" alignItems="center" gap={2}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton width={80} />
                </Box>
              ) : (
                <Skeleton width={80} />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
