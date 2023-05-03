export class Course {

    constructor(
        fields?: {
            id?: number,
            name?: string,
            description?: string,
            teacherId?: number
        }) {
        if (fields) {
            Object.assign(this, fields);
        }

        console.log(this);
    }

    id: number;
    name = "";
    description = "";
    teacherId: number;
}