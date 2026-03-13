import { JwtPayload } from "jsonwebtoken";
import { IDoctorSpecialty } from "./speciality.types";

export interface IDoctor {
        id: string;
        name: string;
        email: string;
        isDeleted: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        profilePhoto: string | null;
        contactNumber: string;
        address: string | null;
        registrationNumber: string;
        experience: number;
        gender: string;
        appointmentFee: number;
        qualification: string;
        currentWorkingPlace: string;
        designation: string;
        avaerageRating: number;
       specialities : IDoctorSpecialty[];
       user: JwtPayload;
}