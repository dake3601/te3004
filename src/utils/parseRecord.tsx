import type { Record, RecordJson } from "../types";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hourCycle: 'h23',
  timeZone: "America/Monterrey"
};

const parseRecord = (record: RecordJson): Record => ({
  ...record,
  setSpeed: parseInt(record.setSpeed),
  voltage: parseFloat(record.voltage),
  current: parseFloat(record.current),
  speed: parseFloat(record.speed),
  timestamp: new Date(record.timestamp).toLocaleString("en-US", options),
});

export { parseRecord };
