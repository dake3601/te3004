import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useWebSocket from 'react-use-websocket';
import { API_WS_URL } from '../utils/config';
import { connectionStatus, connectionStatusColor } from '../utils/connectionStatus';
import CircleIcon from '@mui/icons-material/Circle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StopIcon from '@mui/icons-material/Stop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip';
import { bitToRpm } from '../utils/parseRecord';

const Controls = () => {
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState('Stop');

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

  const handleDirectionChange = (newDirection: string) => {
    setDirection(newDirection);
    sendMessage(JSON.stringify({ speed, direction: newDirection }));
  };

  const handleSpeedChange = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (typeof value !== 'number') return;
    setSpeed(value);
  };

  const handleCommitedSpeedChange = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (typeof value !== 'number') return;
    setSpeed(value);
    sendMessage(JSON.stringify({ speed: value, direction }));
  };

  const handleSpeedClick = (change: number) => {
    return () => {
      const newSpeed = Math.min(Math.max(speed + change, 0), 255);
      if (newSpeed === speed) return;
      setSpeed(newSpeed);
      sendMessage(JSON.stringify({ speed: newSpeed, direction }));
    };
  };

  return (
    <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant='h2' style={{ fontSize: 24 }}>Controls</Typography>
        <CircleIcon sx={{ color: connectionStatusColor[readyState] }} />
      </Stack>
      {!import.meta.env.PROD && <Typography>The websocket is currently: {connectionStatus[readyState]}</Typography>}
      <Stack spacing={3} direction="row" alignItems="center" gap={1}>
        <Tooltip title="Off" arrow>
          <IconButton onClick={() => handleDirectionChange("Off")}>
            <PowerSettingsNewIcon color="action" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Stop" arrow>
          <IconButton onClick={() => handleDirectionChange("Stop")}>
            <StopIcon color="action" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Backward" arrow>
          <IconButton onClick={() => handleDirectionChange("Backward")}>
            <ArrowBackIcon color="action" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Forward" arrow>
          <IconButton onClick={() => handleDirectionChange("Forward")}>
            <ArrowForwardIcon color="action" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box sx={{ width: 300 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Tooltip title="Decrease" arrow>
            <IconButton onClick={handleSpeedClick(-5)}>
              <Remove color="action" />
            </IconButton>
          </Tooltip>
          <Slider
            aria-label="Speed"
            defaultValue={0}
            valueLabelDisplay="auto"
            step={5}
            min={0}
            max={255}
            scale={(x) => bitToRpm(x)}
            value={speed}
            onChange={handleSpeedChange}
            onChangeCommitted={handleCommitedSpeedChange}
          />
          <Tooltip title="Increase" arrow>
            <IconButton onClick={handleSpeedClick(5)}>
              <Add color="action" />
            </IconButton>
          </Tooltip>
          <Typography>{bitToRpm(speed)}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Controls;
