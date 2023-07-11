'use client'

import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { useCallback, useRef } from 'react';

import { useStore } from 'zustand';
import { uuid as randomUUID } from 'uuidv4';

import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  NodeToolbar,
  useReactFlow,
  Node,
  Panel,
  ReactFlowInstance,
  MarkerType,
  OnConnectStartParams,
  Edge,
} from 'reactflow'
import { ReactFlowProvider } from 'reactflow'

import { useRFStore } from '@/app/state/store'

import TextUpdatorNode from '../blocks/TextUpdator'
import CustomNode from './CustomNode'

const proOptions = { hideAttribution: true }

const defaultEdgeOptions = {
  style: { strokeWidth: 1 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
}

const TextUpdator = {
  id: 'node-1',
  type: 'textUpdator',
  position: { x: 100, y: 300 },
  data: { color: '#6ede87' },
}

const nodeTypes = { custom: CustomNode, textUpdator: TextUpdatorNode }

const onInit = (reactFlowInstance: ReactFlowInstance) => reactFlowInstance.zoomTo(15)

const nodeColor = (node: Node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87'
    case 'output':
      return '#6865A5'
    default:
      return '#ff0072'
  }
}

export default function FlowWithProvider(props: any) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  )
}

function Flow() {
  const { nodes, edges, onConnect, onEdgesChange, onNodesChange } = useStore(useRFStore);
  const { addNodes, project, setEdges, setNodes } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const connectingNodeId = useRef<string | null>(null);

  const addNode = (node: Node) => {
    addNodes(node)
  };

  const onConnectStart = useCallback((_event: ReactMouseEvent | ReactTouchEvent, { nodeId }: OnConnectStartParams) => {
    connectingNodeId.current = nodeId as string
  }, [])

  const onConnectEnd = useCallback((event: MouseEvent | TouchEvent) => {
    const targetIsPane = (event?.target as Element)?.classList.contains('react-flow__pane');
    const id = randomUUID();

    if (targetIsPane && id) {
      const { top, left } = reactFlowWrapper.current?.getBoundingClientRect() as DOMRect;
      const newNode: Node = {
        id,
        // we are removing the half of the node width (75) to center the new node
        position: project({ x: (event as MouseEvent).clientX - left - 75, y: (event as MouseEvent).clientY - top }),
        data: { label: `Node ${id.slice(0,5)}` },
      };

      const edge: Edge = { id, source: connectingNodeId.current as string, target: id }
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(edge));
    }
  }, [project, setNodes, setEdges]);

  return (
    <div className="col-span-5 h-screen  bg-zinc-500">
      <div className="col-span-5 h-full bg-white"  ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          proOptions={proOptions}
          nodeTypes={nodeTypes}
          onInit={onInit}
          fitView
        >
          <Panel className="p-4 bg-slate-400 rounded-md" position="top-left">
            <button onClick={() => addNode(TextUpdator)}>Add Node</button>
          </Panel>
          <NodeToolbar />
          <Controls />
          <MiniMap nodeColor={nodeColor} zoomable pannable />
          <Background
            variant={BackgroundVariant.Cross}
            color="#aaa"
            gap={16}
            size={1}
          />
          <Background
            id="2"
            gap={160}
            offset={1}
            color="#ccc"
            variant={BackgroundVariant.Lines}
          />
        </ReactFlow>
      </div>
    </div>
  )
}
