import { Alternatif } from "@src/models/Alternatif";
import { Criteria } from "@src/models/Criteria";
import { WPMService } from "@src/services/WPM";
import { WSMService } from "@src/services/WSM";

export class SPK {
    
    public static createWSM(criteria: Array<Criteria>, alternatives: Array<Array<Alternatif>>): WSMService {
        return new WSMService(criteria, alternatives);
    }

    public static createWPM(criteria: Array<Criteria>, alternatives: Array<Array<Alternatif>>): WPMService {
        return new WPMService(criteria, alternatives);
    }
}