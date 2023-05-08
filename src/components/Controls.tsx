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

const Controls = () => {
  const [speed, setSpeed] = useState(0)
  const [direction, setDirection] = useState('Stop')

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirection((event.target as HTMLInputElement).value)
  }

  const handleSpeedChange = (event: Event) => {
    setSpeed(Number((event.target as HTMLInputElement).value))
  }

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <h2>Controls</h2>
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
            <Remove />
            <Slider
              aria-label="Speed"
              defaultValue={0}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={255}
              value={speed}
              onChange={handleSpeedChange}
            />
            <Add />
            <p>{speed}</p>
          </Stack>
        </Box>
      </FormControl>
    </Stack>
  )
}

export default Controls
