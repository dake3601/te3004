import { DataGrid, GridColDef } from '@mui/x-data-grid';
import type { Record } from '../types';

const RecordsTable = ({ records, options }: { records: Record[], options: Intl.DateTimeFormatOptions }) => {
  const columns: GridColDef[] = [
    { field: 'timestamp', headerName: 'Timestamp', minWidth: 150, sortable: false },
    { field: 'speed', headerName: 'Speed', minWidth: 50, sortable: false },
    { field: 'current', headerName: 'Current', minWidth: 50, sortable: false },
    { field: 'voltage', headerName: 'Voltage', minWidth: 50, sortable: false },
    { field: 'setSpeed', headerName: 'Set Speed', minWidth: 100, sortable: false },
    { field: 'direction', headerName: 'Direction', minWidth: 50, sortable: false },
  ];

  const rows = records.map(record => {
    return {
      id: record.id,
      timestamp: new Date(record.timestamp).toLocaleString("en-US", options),
      direction: record.direction,
      setSpeed: record.setSpeed,
      speed: record.speed,
      current: record.current,
      voltage: record.voltage,
    }
  })

  return (
    <div style={{ height: "100%", width: "90%" }}>
      <DataGrid
        rows={rows}
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
    </div>
  )
}

export default RecordsTable
