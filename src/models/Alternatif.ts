import { AlternatifInterface } from "@src/interfaces/Alternatif";

export class Alternatif implements AlternatifInterface {
    constructor(
        private _name: string,
        private _criteriaValues: number
    ) {}

    getName(): string {
        return this._name;
    }

    getValue(): number {
        return this._criteriaValues;
    }

    setValue(value: number): void {
        this._criteriaValues = value;
    }
    
}