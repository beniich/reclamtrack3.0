import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const supabase = await createClient(cookies())

  const { data: todos, error } = await supabase.from('todos').select()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          Error: {error.message}
        </div>
      )}

      {!todos && !error && (
        <div className="text-slate-500">Loading or no data...</div>
      )}

      {todos && todos.length === 0 && (
        <div className="text-slate-500">No todos found in table. But connection works!</div>
      )}

      <ul className="list-disc pl-5">
        {todos?.map((todo: any) => (
          <li key={todo.id || Math.random()}>{JSON.stringify(todo)}</li>
        ))}
      </ul>
    </div>
  )
}
