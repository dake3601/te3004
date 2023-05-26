import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import type { Record } from '../types';

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const TabPanel = (props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RecordsGraph = ({ records }: { records: Record[] }) => {
  const [tab, setTab] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const data = records.slice(-400);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Speed" {...a11yProps(0)} />
          <Tab label="Voltage" {...a11yProps(1)} />
          <Tab label="Current" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <ResponsiveContainer width="95%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left-axis" domain={[0, 'auto']} tickCount={5} />
            <YAxis yAxisId="right-axis" orientation="right" type="number" domain={[0, 260]} tickCount={5} />
            <Tooltip />
            <Legend />
            <Line name="Speed (rpm)" type="monotone" dataKey="speed" stroke="#82ca9d" yAxisId="left-axis" strokeWidth={3} dot={false} />
            <Line name="Set Speed (0-255)" type="monotone" dataKey="setSpeed" stroke="#8884d8" yAxisId="right-axis" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ResponsiveContainer width="95%" height={400}>
          <LineChart data={data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis type="number" domain={[0, 'auto']} tickCount={5} allowDataOverflow={true} />
            <Tooltip />
            <Legend />
            <Line name="Voltage (V)" type="monotone" dataKey="voltage" stroke="#ff0000" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <ResponsiveContainer width="95%" height={400}>
          <LineChart data={data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis type="number" domain={[0, 'auto']} tickCount={5} allowDataOverflow={true} />
            <Tooltip />
            <Legend />
            <Line name="Current (A)" type="monotone" dataKey="current" stroke="#ffc658" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </TabPanel>
    </Box>

  )
}

export default RecordsGraph
