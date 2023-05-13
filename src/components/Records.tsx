import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket';
import { API_URL, API_WS_URL } from '../utils/config';
import { connectionStatus, connectionStatusColor } from '../utils/connectionStatus';
import CircleIcon from '@mui/icons-material/Circle';
import type { Record } from '../types';
import RecordsTable from './RecordsTable';
import RecordsGraph from './RecordsGraph';

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
        const record = JSON.parse(lastMessage.data) as Record
        setRecords(prevRecords => [...prevRecords, record])
      }
    }
  }, [lastMessage, sendMessage]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${API_URL}/api/records`);
      const json = await data.json() as Record[];
      setRecords(json);
    }

    fetchData().catch(err => console.log(err));
  }, []);

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <Stack direction="row" alignItems="center" gap={1}>
        <CircleIcon sx={{ color: connectionStatusColor[readyState] }} />
        <Typography variant='h2' style={{ fontSize: 24 }}>Records</Typography>
      </Stack>
      {!import.meta.env.PROD && <Typography>The websocket is currently: {connectionStatus[readyState]}</Typography>}
      <RecordsGraph records={records} />
      <Button variant="outlined" onClick={() => setDisplay(!display)}>{display ? 'Hide' : 'Show'} records</Button>
      {display && <RecordsTable records={records} />}
    </Stack>
  )
}

export default Records
