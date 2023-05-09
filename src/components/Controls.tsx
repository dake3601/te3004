import { useState } from 'react'
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
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { API_WS_URL } from '../utils/config';

const Controls = () => {
  const [speed, setSpeed] = useState(0)
  const [direction, setDirection] = useState('Stop')

  const { sendMessage, readyState } = useWebSocket(`${API_WS_URL}/api/commands`);

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDirection = (event.target as HTMLInputElement).value;
    setDirection(newDirection)
    sendMessage(JSON.stringify({ speed, direction: newDirection }))
  }

  const handleSpeedChange = (event: Event) => {
    const newSpeed = Number((event.target as HTMLInputElement).value);
    setSpeed(newSpeed)
    sendMessage(JSON.stringify({ speed: newSpeed, direction }))
  }

  const handleSpeedClick = (change: number) => {
    return () => {
      const newSpeed = Math.min(Math.max(speed + change, 0), 255);
      if (newSpeed === speed) return;
      setSpeed(newSpeed)
      sendMessage(JSON.stringify({ speed: newSpeed, direction }))
    }
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <h2>Controls</h2>
      <p>The websocket is currently: {connectionStatus}</p>
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
            />
            <IconButton onClick={handleSpeedClick(5)}>
              <Add />
            </IconButton>
            <p>{speed}</p>
          </Stack>
        </Box>
      </FormControl>
    </Stack>
  )
}

export default Controls
