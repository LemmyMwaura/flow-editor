import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import initialNodes from '../utils/nodes';
import initialEdges from '../utils/edges';

export type NodeData = {
  color: string;
  label: any;
}

export type RFState = {
  nodes: Node<NodeData>[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  updateNodeColor: (nodeId: string, color: string) => void
}

export const useRFStore = create<RFState>()(persist((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  updateNodeColor: (id: string, color: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if ((node.id === id)) {
          node.data = { ...node.data, color }
        }

        return node
      }),
    })
  },
}),  { name: 'node-store'}));

