import { NextApiRequest, NextApiResponse } from "next"

var locallydb = require('locallydb')
const db = new locallydb("data")
const doctors = db.collection('doctors')
const appointments = db.collection('appointments')

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const numDoctors = doctors.items.length
    for (let i = 0; i < numDoctors; i++) {
        const doctor = doctors.items[0]
        doctors.remove(doctor?.cid)
    }

    doctors.insert([
        {
            "id": 1,
            "firstName": "Julius",
            "lastName": "Hibbert",
            "email": "julius@notadoctor.fake",
            "active": true,
        },
        {
            "id": 2,
            "firstName": "Algernop",
            "lastName": "Krieger",
            "email": "algernop@notadoctor.fake",
            "active": true,
        },
        {
            "id": 3,
            "firstName": "John",
            "lastName": "Zoidberg",
            "email": "john@notadoctor.fake",
            "active": true,
        }
    ])
    doctors.save()

    const numAppts = appointments.items.length
    for (let i = 0; i < numAppts; i++) {
        const appt = appointments.items[0]
        appointments.remove(appt?.cid)
    }

    appointments.insert([
        {
            "id": 1,
            "doctorId": 2,
            "firstName": "Sterling",
            "lastName": "Archer",
            "apptDate": "2022-11-03",
            "apptTime": "08:00:00",
            "newPatient": true,
            "deleted": false,
        },
        {
            "id": 2,
            "doctorId": 2,
            "firstName": "Cyril",
            "lastName": "Figis",
            "apptDate": "2022-11-03",
            "apptTime": "09:00:00",
            "newPatient": false,
            "deleted": false,
        },
        {
            "id": 3,
            "doctorId": 2,
            "firstName": "Ray",
            "lastName": "Gillete",
            "apptDate": "2022-11-03",
            "apptTime": "09:00:00",
            "newPatient": false,
            "deleted": false,
        },
        {
            "id": 4,
            "doctorId": 2,
            "firstName": "Lana",
            "lastName": "Kane",
            "apptDate": "2022-11-03",
            "apptTime": "09:30:00",
            "newPatient": true,
            "deleted": false,
        },
        {
            "id": 5,
            "doctorId": 2,
            "firstName": "Pam",
            "lastName": "Poovey",
            "apptDate": "2022-11-03",
            "apptTime": "10:00:00",
            "newPatient": true,
            "deleted": false,
        },
        {
            "id": 6,
            "doctorId": 1,
            "firstName": "Barney",
            "lastName": "Gumble",
            "apptDate": "2022-11-05",
            "apptTime": "10:30:00",
            "newPatient": false,
            "deleted": false,
        },
        {
            "id": 7,
            "doctorId": 1,
            "firstName": "Moe",
            "lastName": "Syzlack",
            "apptDate": "2022-11-05",
            "apptTime": "10:30:00",
            "newPatient": false,
            "deleted": false,
        }
    ])
    appointments.save()


    const body = {doctors: doctors.items, appointments: appointments.items}
    res.status(200).json(body)

}