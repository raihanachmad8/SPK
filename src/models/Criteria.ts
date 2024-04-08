import { CriteriaType } from "@src/enum/CriteriaType";
import { CriteriaInterface } from "@src/interfaces/Criteria";

export class Criteria implements CriteriaInterface {
    constructor(
        private _name: string,
        private _weight: number,
        private _type: CriteriaType
    ) {}

    getName(): string {
        return this._name;
    }

    getWeight(): number {
        return this._weight;
    }

    getType(): CriteriaType {
        return this._type;
    }

    setWeight(weight: number): void {
        this._weight = weight;
    }
    
}
