import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { API_URL, API_WS_URL } from '../utils/config';

interface Record {
  id: string
  timestamp: string
  direction: string
  setSpeed: number
  speed: number
  current: number
  voltage: number
}


const Records = () => {
  const [records, setRecords] = useState<Record[]>([])

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
    fetch(`${API_URL}/api/records`).then(
      res => res.json().then(data => data as Record[])
    ).then(
      data => setRecords(data)
    ).catch(
      err => console.log(err)
    )
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <h2>Records</h2>
      <p>The websocket is currently: {connectionStatus}</p>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <p>Timestamp</p>
        <p>Set speed</p>
        <p>Direction</p>
        <p>Speed</p>
        <p>Current</p>
        <p>Voltage</p>
      </Stack>
      {records.map((record: Record) => (
        <Stack spacing={5} direction="row" sx={{ mb: 1 }} alignItems="center" key={record.id}>
          <p>{new Intl.DateTimeFormat('es-MX').format(new Date(record.timestamp))}</p>
          <p>{record.setSpeed}</p>
          <p>{record.direction}</p>
          <p>{record.speed}</p>
          <p>{record.current}</p>
          <p>{record.voltage}</p>
        </Stack>
      ))}
    </Stack>
  )
}

export default Records
