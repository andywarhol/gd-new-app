
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
    "products": ExitProduct[]
}