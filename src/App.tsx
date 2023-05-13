import './App.css'
import Controls from './components/Controls'
import Records from './components/Records'
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Typography variant='h1' style={{ fontSize: 32, fontWeight: 'bold', marginBottom: '20px' }}>TE3004 Desarrollo de telecomunicaciones y sistemas energéticos</Typography>
      <Controls />
      <Records />
    </>
  )
}

export default App
