import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    fetch("https://te3004-api.onrender.com/api/records").then(
      res => res.json().then(data => data as Record[])
    ).then(
      data => setRecords(data)
    ).catch(
      err => console.log(err)
    )
  }, []);

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <h2>Records</h2>
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
