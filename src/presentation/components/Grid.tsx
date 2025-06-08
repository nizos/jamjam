import { Line } from 'react-konva'

export function Grid() {
  return (
    <>
      <Line points={[0, 0, 100, 0]} stroke="#e0e0e0" />
      <Line points={[0, 20, 100, 20]} stroke="#e0e0e0" />
      <Line points={[0, 0, 0, 100]} stroke="#e0e0e0" />
    </>
  )
}
