import type { Record, RecordJson } from "../types";

const maxBit = 255;
const maxVoltage = 9.63;
const minVoltage = 0.21;
const maxSpeed = 3465;

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

const bitToRpm = (bit: number): number => Math.round((maxSpeed * (bit * (maxVoltage - minVoltage) / maxBit + minVoltage) / 10));
const rpmToBit = (rpm: number): number => Math.round((rpm * 10 / maxSpeed - minVoltage) * maxBit / (maxVoltage - minVoltage));

const parseRecord = (record: RecordJson): Record => ({
  ...record,
  setSpeed: bitToRpm(parseFloat(record.setSpeed)),
  voltage: parseFloat(record.voltage),
  current: parseFloat(record.current),
  speed: parseFloat(record.speed),
  timestamp: new Date(record.timestamp).toLocaleString("en-US", options),
});

export { parseRecord, bitToRpm, rpmToBit };
