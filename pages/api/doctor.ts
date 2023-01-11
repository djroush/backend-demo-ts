import type { NextApiRequest, NextApiResponse } from 'next'
import { DbDoctor, Doctor, NewDoctor, ReqError } from '../../src/models'

const locallydb = require('locallydb')
const db = new locallydb("data")
const doctors = db.collection('doctors')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Doctor|ReqError>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
  } else {
    const newDoctor: NewDoctor = req.body
    const lastId = doctors.header.lcid

    const doctor: Doctor = {id: lastId+1, ...newDoctor, active: true}
    doctors.insert(doctor)
    const { cid, $created, $updated, ...response } = (doctor as DbDoctor)
    res.status(200).json({...response})
  }
}
