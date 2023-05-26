import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket';
import { API_URL, API_WS_URL } from '../utils/config';
import { connectionStatus, connectionStatusColor } from '../utils/connectionStatus';
import CircleIcon from '@mui/icons-material/Circle';
import type { Record, RecordJson } from '../types';
import RecordsTable from './RecordsTable';
import RecordsGraph from './RecordsGraph';
import { parseRecord } from '../utils/parseRecord';

const Records = () => {
  const [records, setRecords] = useState<Record[]>([])
  const [display, setDisplay] = useState(false)

  const { sendMessage, lastMessage, readyState } = useWebSocket(`${API_WS_URL}/api/updates`, {
    shouldReconnect: () => true,
    retryOnError: true,
    reconnectAttempts: 100000,
    reconnectInterval: 100,
  });

  useEffect(() => {
    if (lastMessage !== null && lastMessage.data !== null) {
      if (lastMessage.data === 'pong') {
        return;
      } else if (lastMessage.data === 'ping') {
        sendMessage('pong');
        return;
      } else {
        const record = JSON.parse(lastMessage.data) as RecordJson
        setRecords(prevRecords => [...prevRecords, parseRecord(record)])
      }
    }
  }, [lastMessage, sendMessage]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${API_URL}/api/records`);
      const json = await data.json() as RecordJson[];
      setRecords((json).map(parseRecord));
    }

    fetchData().catch(err => console.log(err));
  }, []);

  const deleteRecords = async () => {
    if (!window.confirm('Are you sure you want to delete all records?')) return;
    const data = await fetch(`${API_URL}/api/records`, {
      method: 'DELETE',
    });
    if (data.status !== 204) return;
    setRecords([]);
  }

  const downloadRecords = async () => {
    if (records.length === 0) return;
    const headers = 'Timestamp,Speed,Current,Voltage,SetSpeed,Direction\n';
    const csv = headers + records.map(record => {
      return `"${record.timestamp.replace(",", "")}",${record.speed},${record.current},${record.voltage},${record.setSpeed},${record.direction}`
    }).join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'records.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant='h2' style={{ fontSize: 24 }}>Records</Typography>
        <CircleIcon sx={{ color: connectionStatusColor[readyState] }} />
      </Stack>
      {!import.meta.env.PROD && <Typography>The websocket is currently: {connectionStatus[readyState]}</Typography>}
      <RecordsGraph records={records} />
      <Stack spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Button variant="outlined" onClick={() => setDisplay(!display)}>{display ? 'Hide' : 'Show'} records</Button>
        <Button variant="outlined" color="secondary" onClick={downloadRecords}>Download</Button>
        <Button variant="outlined" color="error" onClick={deleteRecords}>Delete</Button>
      </Stack>
      {display && <RecordsTable records={records} />}
    </Stack>
  )
}

export default Records
