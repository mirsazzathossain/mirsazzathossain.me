import { Button, Tooltip } from '@material-tailwind/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Tooltip content="Coming Soon" placement="bottom">
          <Button>Hello World</Button>
        </Tooltip>
      </div>
    </>
  )
}

export default Home
