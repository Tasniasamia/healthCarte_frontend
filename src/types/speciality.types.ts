export interface ISpecialty {
    id: string
    title: string
    description?: string
    icon?: string
  }
  export interface IDoctorSpecialty {
    id: string
    doctorId: string
    specialtyId: string
    specialty: ISpecialty
  }