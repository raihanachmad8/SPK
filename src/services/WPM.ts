import { Alternatif } from "@src/models/Alternatif";
import { Criteria } from "@src/models/Criteria";
import { WSMService } from "./WSM";
import { WSMWPMService } from "./WSMWMPService";

export class WPMService extends WSMWPMService{
    public constructor(
        criteria: Array<Criteria>,
        alternatif: Array<Array<Alternatif>>
    ) {
        super(criteria, alternatif);
    }

    public stepCountWeightedValue(precision? : number): Array<Array<Alternatif>> {
        let result: Array<Array<Alternatif>> = [];
        let normalizedValue = super.stepNormalizeValue();
        normalizedValue.forEach((alternatif, alternatifIndex) => {
            let temp: Array<Alternatif> = [];
            alternatif.forEach((alternative, alternativeIndex) => {
                temp.push(new Alternatif(alternative.getName(), parseFloat((Math.pow(alternative.getValue(), this.criteria[alternatifIndex].getWeight())).toFixed(precision || 3))));
            });
            result.push(temp);
        });
        return result;

    }

    public stepCountWPM(precision? : number): { [key: string]: number } {
        const result: { [key: string]: number } = {};
        const weightedValue = this.stepCountWeightedValue();
    
        weightedValue.forEach((alternatif, indexAltenatif) => {
            alternatif.forEach((alternative) => {
                if (result[alternative.getName()]) {
                    result[alternative.getName()] *= alternative.getValue();
                } else {
                    result[alternative.getName()] = alternative.getValue();
                }
            });
        });
        
        for (let key in result) {
            result[key] = parseFloat((result[key] * 10 / 10).toFixed(precision || 3));
        }
        
        return result;
    }

    public stepSortRanking(precision? : number): { name: string, ranking: string, value: number }[] {
        const result: { name: string, ranking: string, value: number }[] = [];
        const wpm = this.stepCountWPM(precision || 3);
        const sortedKeys = Object.keys(wpm).sort((a, b) => wpm[b] - wpm[a]);
    
        sortedKeys.forEach((name, index) => {
            result.push({ name: name, ranking: `Ranking ${index + 1}`, value: wpm[name] });
        });
    
        return result;
    }

}