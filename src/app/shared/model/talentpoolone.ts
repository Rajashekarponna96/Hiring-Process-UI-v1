// export interface TalentPoolOne {
//     id: number;
//     name: string;
//     description: string;
//     candidates: Candidateone[];
// }

export interface Candidateone {
    id: number;
}

export class TalentPoolOne {
    id: number;
    name: string;
    description: string;
    candidates: Candidateone[];

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.candidates = [];
    }
}
