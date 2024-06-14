import { ExitStatus } from "./enums/status.enum"
import { User } from "./user.interface"

export interface ExitProduct {
    "productId": string,
    "model": string,
    "quantity": number,
    "returned": number
}

export interface Exit {
    "_id"?: string,
    "key": string,
    "employee": string,
    "project": string,
    "client": string,
    "receives": string,
    "createdAt"?:string,
    "createdBy"?:User,
    "products": ExitProduct[],
    "status"?: ExitStatus
}

