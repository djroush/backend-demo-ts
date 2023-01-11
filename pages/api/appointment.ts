import type { NextApiRequest, NextApiResponse } from 'next'
import { Appt, DbAppt, NewAppt, ReqError } from '../../src/models'

const locallydb = require('locallydb')
const db = new locallydb("data")
const appts = db.collection('appointments')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Appt|ReqError>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
  } else {
    const newAppt: NewAppt = req.body
    const lastId = appts.header.lcid
    const appt: Appt = {id: lastId+1, ...newAppt, deleted: false}
    appts.insert(appt)
    const { cid, $created, $updated, ...response } = (appt as DbAppt)
    res.status(200).json({...response})

  }
}
