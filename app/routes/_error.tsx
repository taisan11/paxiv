import { ErrorHandler } from 'hono'

const handler: ErrorHandler = (e, c) => {
  console.error(e)
  return c.render(<h1>Error! {e.message}</h1>)
}

export default handler