import Flow from '@/app/components/flow/Flow'

export default function Home() {
  return (
    <main className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-700">left - side</div>
        <Flow></Flow>
    </main>
  )
}
