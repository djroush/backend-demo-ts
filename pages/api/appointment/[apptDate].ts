import type { NextApiRequest, NextApiResponse } from 'next'
import { Appt, CancelAppt, DbAppt, ReqError } from '../../../src/models'
import { toNumber } from '../../../src/util'

var locallydb = require('locallydb')
const db = new locallydb("data")
const appts = db.collection('appointments')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | Appt | ReqError>
) {
  if (req.method !== 'DELETE') {
    res.status(405).send({ message: 'Only DELETE requests allowed' })
  } else {
    //weird naming because Next.js can't handle different slugs
    const { apptDate } = req.query
    const apptId = toNumber(apptDate)
    const collection = appts.where({ id: apptId })
    const dbAppts: DbAppt[] = collection.items
    if (dbAppts.length === 0) {
      res.status(204).json(undefined)
    } else if (dbAppts.length === 1 ) {
      const cancelledAppts: DbAppt[] = dbAppts.map(({ ...others }) => ({ ...others, deleted: true }))
      const filteredAppts: Appt[] = cancelledAppts.map(({ cid, $created, $updated, ...others }) => others)
      const {cid} = cancelledAppts[0]
      appts.update(cid, cancelledAppts[0])
      res.status(200).json(filteredAppts[0])
    }
  }
}
