import { CriteriaType } from "@src/enum/CriteriaType";
import { Alternatif } from "@src/models/Alternatif";
import { Criteria } from "@src/models/Criteria";

export class WSMWPMService {
    protected criteria: Array<Criteria> = [];
    protected alternatif: Array<Array<Alternatif>> = [];
    public constructor(
        criteria: Array<Criteria>,
        alternatif: Array<Array<Alternatif>>
    ) {
        try {
            if (criteria.length !== alternatif.length) {
                throw new Error("Criteria and Alternatif length must be the same");
            }
            this.criteria = criteria;
            this.alternatif = alternatif;

            // this._normalizeValue();
            this._normalizeWeight();
        } catch (error) {
            console.error(error);
        }
    }

    public getCriteria(): Array<Criteria> {
        return this.criteria;
    }

    public getCriteriaName(criteriaIndex: number): string {
        return this.criteria[criteriaIndex].getName();
    }

    public getAlternatif(): Array<Array<Alternatif>> {
        return this.alternatif;
    }
    
    public getAlternatifName(criteriaIndex: number, alternativeIndex: number): string {
        return this.alternatif[criteriaIndex][alternativeIndex].getName();
    }
    
    public getCriteriaValue(criteriaName: String): Array<Alternatif> {
        let criteriaIndex = this.criteria.findIndex((criteria) => criteria.getName() === criteriaName);
        return this.alternatif[criteriaIndex];
    }
    public getCriteriaAlternatifValue(criteriaName: String, alternativeName: String): number {
        let criteriaIndex = this.criteria.findIndex((criteria) => criteria.getName() === criteriaName);
        let alternativeIndex = this.alternatif[criteriaIndex].findIndex((alternative) => alternative.getName() === alternativeName);
        return this.alternatif[criteriaIndex][alternativeIndex].getValue();
    }

    public getCriteriaLength(): number {
        return this.criteria.length;
    }

    public getAlternatifLength(): number {
        return this.alternatif.length;
    }

    protected _getCriteriaWeightSum(): number {
        let sum = 0;
        this.criteria.forEach((criteria) => {
            sum += criteria.getWeight();
        });
        return sum;
    }

    protected _normalizeWeight() : void {
        let sum = this._getCriteriaWeightSum();
        this.criteria.forEach((criteria) => {
            criteria.setWeight(criteria.getWeight() / sum);
        });
    }

    public stepNormalizeValue(precision? : number): Array<Array<Alternatif>> {
        let result: Array<Array<Alternatif>> = [];
        this.criteria.forEach((criteria, criteriaIndex) => {
            let temp: Array<Alternatif> = [];
            if (criteria.getType() === CriteriaType.BENEFIT) {
                let max = Math.max(...this.alternatif[criteriaIndex].map((alternative) => alternative.getValue()));
                this.alternatif[criteriaIndex].forEach((alternative) => {
                    temp.push(new Alternatif(alternative.getName(), parseFloat((alternative.getValue() / max).toFixed(precision || 1))));
                });
            } else {
                let min = Math.min(...this.alternatif[criteriaIndex].map((alternative) => alternative.getValue()));
                this.alternatif[criteriaIndex].forEach((alternative) => {
                    temp.push(new Alternatif(alternative.getName(), parseFloat((min / alternative.getValue()).toFixed(precision || 1))));
                });
            }
            result.push(temp);
        });
        return result;
    }
    
}