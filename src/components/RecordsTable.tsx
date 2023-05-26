import { DataGrid, GridColDef } from '@mui/x-data-grid';
import type { Record } from '../types';
import Box from '@mui/material/Box';

const RecordsTable = ({ records }: { records: Record[] }) => {
  const columns: GridColDef[] = [
    { field: 'timestamp', headerName: 'Timestamp', flex: 125, sortable: false, },
    { field: 'speed', headerName: 'Speed', flex: 75, sortable: false },
    { field: 'current', headerName: 'Current', flex: 75, sortable: false },
    { field: 'voltage', headerName: 'Voltage', flex: 75, sortable: false },
    { field: 'setSpeed', headerName: 'Set Speed', flex: 75, sortable: false },
    { field: 'direction', headerName: 'Direction', flex: 75, sortable: false, },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minWidth='60vw'
    >
      <DataGrid
        rows={records}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        density="compact"
        clipboardCopyCellDelimiter=","
        disableColumnFilter
        disableColumnMenu
        hideFooterSelectedRowCount
      />
    </Box >
  )
}

export default RecordsTable
