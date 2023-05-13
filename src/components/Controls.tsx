import { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useWebSocket from 'react-use-websocket';
import { API_WS_URL } from '../utils/config';
import { connectionStatus, connectionStatusColor } from '../utils/connectionStatus';
import CircleIcon from '@mui/icons-material/Circle';

const Controls = () => {
  const [speed, setSpeed] = useState(0)
  const [direction, setDirection] = useState('Stop')

  const { sendMessage, lastMessage, readyState } = useWebSocket(`${API_WS_URL}/api/commands`, {
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
      }
    }
  }, [lastMessage, sendMessage]);

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDirection = (event.target as HTMLInputElement).value;
    setDirection(newDirection)
    sendMessage(JSON.stringify({ speed, direction: newDirection }))
  }

  const handleSpeedChange = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (typeof value !== 'number') return;
    setSpeed(value)
  }

  const handleCommitedSpeedChange = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (typeof value !== 'number') return;
    setSpeed(value)
    sendMessage(JSON.stringify({ speed: value, direction }))
  }

  const handleSpeedClick = (change: number) => {
    return () => {
      const newSpeed = Math.min(Math.max(speed + change, 0), 255);
      if (newSpeed === speed) return;
      setSpeed(newSpeed)
      sendMessage(JSON.stringify({ speed: newSpeed, direction }))
    }
  }

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <Stack direction="row" alignItems="center" gap={1}>
        <CircleIcon sx={{ color: connectionStatusColor[readyState] }} />
        <Typography variant='h2' style={{ fontSize: 24 }}>Controls</Typography>
      </Stack>
      {!import.meta.env.PROD && <Typography>The websocket is currently: {connectionStatus[readyState]}</Typography>}
      <FormControl>
        <FormLabel id="motor-direction">Motor Direction</FormLabel>
        <RadioGroup
          row
          aria-labelledby="motor-direction"
          defaultValue="Stop"
          name="radio-buttons-group"
          value={direction}
          onChange={handleDirectionChange}
        >
          <FormControlLabel value="Backwards" control={<Radio />} label="Backwards" />
          <FormControlLabel value="Stop" control={<Radio />} label="Stop" />
          <FormControlLabel value="Forward" control={<Radio />} label="Forward" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="motor-speed">Motor Speed</FormLabel>
        <Box sx={{ width: 300 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <IconButton onClick={handleSpeedClick(-5)}>
              <Remove />
            </IconButton>
            <Slider
              aria-label="Speed"
              defaultValue={0}
              valueLabelDisplay="auto"
              step={5}
              min={0}
              max={255}
              value={speed}
              onChange={handleSpeedChange}
              onChangeCommitted={handleCommitedSpeedChange}
            />
            <IconButton onClick={handleSpeedClick(5)}>
              <Add />
            </IconButton>
            <Typography>{speed}</Typography>
          </Stack>
        </Box>
      </FormControl>
    </Stack>
  )
}

export default Controls
