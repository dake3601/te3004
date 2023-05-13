import { ReadyState } from 'react-use-websocket';

const connectionStatus = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
}

const connectionStatusColor = {
  [ReadyState.CONNECTING]: 'orange',
  [ReadyState.OPEN]: 'green',
  [ReadyState.CLOSING]: 'orange',
  [ReadyState.CLOSED]: 'red',
  [ReadyState.UNINSTANTIATED]: 'red',
}

export { connectionStatus, connectionStatusColor }
