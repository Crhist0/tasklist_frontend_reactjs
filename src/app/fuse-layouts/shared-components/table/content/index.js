/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import _ from '@lodash';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material/';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import TableHeaderComponent from '../header';

export default function TableContent({ action, columns, data, actionDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className="w-full flex flex-col ">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHeaderComponent
            columns={columns}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'title': {
                      return o[order.title];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                return (
                  <TableRow className="h-64" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell className="p-4 md:p-16" component="th" scope="left">
                      <Typography className="font-bold" color="primary">
                        {n[columns[0].id]}
                      </Typography>
                    </TableCell>

                    {columns.map((item, index) => {
                      if (index === 0) {
                        return null;
                      }
                      return (
                        <TableCell className="p-4 md:p-16" component="th" scope="row" key={item.id}>
                          {item.id === 'enable'
                            ? n.enable === true
                              ? 'Ativo'
                              : 'Inativo'
                            : n[item.id]}
                        </TableCell>
                      );
                    })}

                    {action && (
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                        <IconButton aria-label="Detalhes" onClick={(e) => action(n)}>
                          <EditIcon />
                        </IconButton>
                        {actionDelete ? (
                          <>
                            <IconButton aria-label="Apagar" onClick={(e) => actionDelete(n)}>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Linhas por página"
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage} // consolelog reclamou pedindo esse
        // onChangePage={handleChangePage}  // e disse que esse é unkown
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
