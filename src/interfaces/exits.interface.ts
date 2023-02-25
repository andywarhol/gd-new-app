
export interface ExitProduct {
    "productId": string,
    "model": string,
    "quantity": number,
    "returned": number
}

export interface Exit {
    "key": string,
    "employee": string,
    "project": string,
    "client": string,
    "receives": string,
    "products": ExitProduct[]
}