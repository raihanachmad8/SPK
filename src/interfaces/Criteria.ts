import { CriteriaType } from "@src/enum/CriteriaType";

export interface CriteriaInterface {
    getName(): string;
    getWeight(): number;
    getType(): CriteriaType;

    setWeight(weight: number): void;
}