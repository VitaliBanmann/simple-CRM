export class User {
    firstname: string;
    lastname: string;
    birthdate: number;
    email: string;
    phone: string;
    address: string;

    constuctor(obj?: any) {
        this.firstname = obj? obj.firstname: '';
        this.lastname = obj? obj.lastname: '';
        this.birthdate = obj? obj.birthdate: 0;
        this.email = obj? obj.email: '';
        this.phone = obj? obj.phone: '';
        this.address = obj? obj.address: '';
    }
}