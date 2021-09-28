// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from 'next'

const handler: NextApiHandler = (_req, res) => {
  res.status(200).json({ message: 'Welcome to Finlab API' })
}

export default handler
