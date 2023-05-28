'use client'

import { useCallback } from 'react'

import { 
  ReactFlow, useNodesState, useEdgesState,
  addEdge, Controls, MiniMap, Background, Edge,
  BackgroundVariant,Connection,ConnectionLineType,
} from 'reactflow'

import CustomNode from './CustomNode'

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 250 }, data: { label: '2' } },
  { id: '3', position: { x: 200, y: 250 }, data: { label: '3' } },
  { id: '4', position: { x: 100, y: 400 }, data: { label: '4' } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
]

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
}

const nodeTypes = {
  custom: CustomNode,
};

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div 
      className="col-span-5 h-screen px-20 py-10 bg-zinc-500"
    >
      <div className="col-span-5 h-full bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap zoomable pannable />
          <Background variant={BackgroundVariant.Dots} color="#aaa" gap={16} size={1} />
        </ReactFlow>
      </div>
    </div>
  )
}
