
import { TodoItem } from "./components/ToDoItem"
import { prisma } from "./db"
import Link from "next/link"

function getTodos() {
  return prisma.todo.findMany()
}

async function ClearAll(){
  await prisma.todo.deleteMany({})
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } })
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <header className="flex justify-center items-center mb-4 flex-col gap-5">
        <h1 className="text-3xl flex ">Ce am de facut la IT</h1>
        
      
      <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none text-2xl"
          href="/new"
        >
          New
        </Link>
        </header>
      <div className="justify-center items-center flex text-xl">
        <ul className=" pl-4 space-y-2">
          {todos.map(todo => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))}
        </ul>
      </div>
    </>
  )
}
