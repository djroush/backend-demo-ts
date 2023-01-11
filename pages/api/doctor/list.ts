import type { NextApiRequest, NextApiResponse } from 'next'
import { DbDoctor, Doctor, ReqError } from '../../../src/models'

var locallydb = require('locallydb')
const db = new locallydb("data")

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Doctor[]|ReqError>
) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
  } else {
    const dbAppts: DbDoctor[]  = db.collection('doctors').items
    const filteredDoctors: Doctor[] = dbAppts.map(({cid, $created, $updated, ...others}) => others)

    res.status(200).json(filteredDoctors ?? {})
  }
}
