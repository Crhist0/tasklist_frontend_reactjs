import TableContent from './content';

export default function TableComponent({ columns, data, action, actionDelete }) {
  return <TableContent columns={columns} data={data} action={action} actionDelete={actionDelete} />;
}
