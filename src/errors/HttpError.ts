export default class HttpErrors extends Error{
    message:string;
    status:number;

    constructor(status: number, message: string){
        super();
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, HttpErrors.prototype);
    }
} 