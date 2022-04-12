import { useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';

function PaymentsTableHead(props) {
  const [loading, setLoading] = useState(false);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableRow className="h-0.5">
        {props.column.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props?.order?.id === row?.id ? props?.order?.direction : false}
            >
              {row.sort ? (
                <Tooltip
                  title="Ordenar"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props?.order?.id === row?.id}
                    direction={props?.order?.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                row.label
              )}
            </TableCell>
          );
        }, this)}
        <TableCell className="p-4 md:p-16" padding="normal" sortDirection={false} />
      </TableRow>
    </TableHead>
  );
}

export default PaymentsTableHead;
