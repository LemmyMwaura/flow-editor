import { ChangeEvent, useCallback } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

import { useStore } from 'zustand'
import { useRFStore } from '@/app/state/store'

type NodeData = {
  color: string
}

const TextUpdatorNode = ({ id, data }: NodeProps<NodeData>) => {
  const { updateNodeColor } = useStore(useRFStore)

  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    updateNodeColor(id, evt.target.value)
  }, [id, updateNodeColor])

  return (
    <div className="bg-white rounded-lg" style={{ backgroundColor: data.color }}>
      <Handle type="target" position={Position.Top}></Handle>
      <div className="p-4 border-pink-400 border rounded">
        <input
          type="color"
          defaultValue={data.color}
          onChange={onChange}
          className="border-none no-drag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default TextUpdatorNode
