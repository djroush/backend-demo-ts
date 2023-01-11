export type NewAppt = {
    doctorId: number
    firstName: string
    lastName: string
    apptDate: string
    apptTime: string
    newPatient: boolean
}

export type CancelAppt = {
    id: number
}

export type Appt = NewAppt  & {
    id: number
    deleted: boolean
}

export type DbAppt = Appt & DbData 

export type NewDoctor =  {
    firstName: string
    lastName: string
    email: string
}
export type Doctor = NewDoctor & {
    id: number
    active: boolean
}
export type DbDoctor = Doctor & DbData


type DbData = {
    cid: number
    $created: string
    $updated: string
}

export type ReqError = {
    message: string
}