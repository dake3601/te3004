import './App.css'
import Controls from './components/Controls'
import Records from './components/Records'
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const App = () => {
  return (
    <Box
      display="flow-root"
      flexDirection='column'
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100%"
      margin={0}
    >
      <CssBaseline />
      <Typography variant='h1' style={{ fontSize: 32, fontWeight: 'bold', marginBottom: '20px' }}>TE3004 Desarrollo de telecomunicaciones y sistemas energéticos</Typography>
      <Controls />
      <Records />
    </Box>
  )
}

export default App
