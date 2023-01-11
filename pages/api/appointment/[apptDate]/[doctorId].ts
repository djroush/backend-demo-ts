import type { NextApiRequest, NextApiResponse } from 'next'
import { Appt, DbAppt, ReqError } from '../../../../src/models'
import { toNumber } from '../../../../src/util'

var locallydb = require('locallydb')
const db = new locallydb("data")

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Appt[]|ReqError>
) {
  let { apptDate, doctorId } = req.query

  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
  } else {

    const docId = toNumber(doctorId)
    const appts = db.collection('appointments')
    const dbAppts: DbAppt[] = appts.where({doctorId: docId, apptDate}).items
    const filteredAppts: Appt[] = dbAppts.map(({cid, $created, $updated, ...others}) => others)
  
    res.status(200).json(filteredAppts)  
  }
}