export interface Record {
  id: string
  timestamp: string
  direction: string
  setSpeed: number
  speed: number
  current: number
  voltage: number
}

export interface RecordJson {
  id: string
  timestamp: string
  direction: string
  setSpeed: string
  speed: string
  current: string
  voltage: string
}
