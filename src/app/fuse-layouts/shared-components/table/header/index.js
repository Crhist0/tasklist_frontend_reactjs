import { useState } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@mui/material';

function TableHeadComponent(props) {
  const [loading, setLoading] = useState(false);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {props.columns.map((column) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={column.id}
              align={column.align}
              padding={column.disablePadding ? 'none' : 'normal'}
              sortDirection={props?.order?.id === column?.id ? props?.order?.direction : false}
            >
              {column.sort ? (
                <Tooltip
                  title="Ordenar"
                  placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props?.order?.id === column?.id}
                    direction={props?.order?.direction}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                column.label
              )}
            </TableCell>
          );
        }, this)}
        <TableCell className="p-4 md:p-16" padding="normal" sortDirection={false} />
      </TableRow>
    </TableHead>
  );
}

export default TableHeadComponent;
