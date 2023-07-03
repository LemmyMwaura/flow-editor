import { Node } from 'reactflow'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 20, y: 20 },
    data: { label: '1' },
    draggable: false,
    style: { backgroundColor: 'green', color: 'yellow' },
  },
  { id: '2', position: { x: 0, y: 250 }, data: { label: 354 } },
  {
    id: '3',
    type: 'default',
    position: { x: 200, y: 250 },
    data: { label: '3' },
  },
  {
    id: '4',
    type: 'default',
    position: { x: 100, y: 400 },
    data: { label: '4' },
  },
]

export default initialNodes
