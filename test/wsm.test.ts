import { SPK } from "@src/app";
import { CriteriaType } from "@src/enum/CriteriaType";
import { Alternatif } from "@src/models/Alternatif";
import { Criteria } from "@src/models/Criteria";

describe("WSMService", () => {
    const criteria: Criteria[] = [
        new Criteria("Fasilitas pendukung di apartemen", 30, CriteriaType.BENEFIT),
        new Criteria("Harga bangunan per meter persegi", 20, CriteriaType.COST),
        new Criteria("Tahun konstruksi bangunan apartemen", 20, CriteriaType.BENEFIT),
        new Criteria("Jarak dari tempat kerja (dalam kilometer)", 20, CriteriaType.COST),
        new Criteria("Sistem keamanan apartemen", 10, CriteriaType.BENEFIT)
    ];

    const alternatives: Alternatif[][] = [
        [
            new Alternatif("Apartemen 1", 2),
            new Alternatif("Apartemen 2", 4),
            new Alternatif("Apartemen 3", 3)
        ],
        [
            new Alternatif("Apartemen 1", 7000000),
            new Alternatif("Apartemen 2", 10000000),
            new Alternatif("Apartemen 3", 8500000)
        ],
        [
            new Alternatif("Apartemen 1", 2012),
            new Alternatif("Apartemen 2", 2015),
            new Alternatif("Apartemen 3", 2010)
        ],
        [
            new Alternatif("Apartemen 1", 7),
            new Alternatif("Apartemen 2", 2),
            new Alternatif("Apartemen 3", 4)
        ],
        [
            new Alternatif("Apartemen 1", 3),
            new Alternatif("Apartemen 2", 3),
            new Alternatif("Apartemen 3", 4)
        ]
    ];

    const wsmService = SPK.createWSM(criteria, alternatives);

    it("should return criteria length", () => {
        expect(wsmService.getCriteriaLength()).toBe(5);
    });

    it("should return criteria name", () => {
        expect(wsmService.getCriteriaName(0)).toBe("Fasilitas pendukung di apartemen");
        expect(wsmService.getCriteriaName(1)).toBe("Harga bangunan per meter persegi");
        expect(wsmService.getCriteriaName(2)).toBe("Tahun konstruksi bangunan apartemen");
        expect(wsmService.getCriteriaName(3)).toBe("Jarak dari tempat kerja (dalam kilometer)");
        expect(wsmService.getCriteriaName(4)).toBe("Sistem keamanan apartemen");
    });

    it("should return alternatives length", () => {
        expect(wsmService.getAlternatifLength()).toBe(5);
    });

    it("should return alternatives name", () => {
        expect(wsmService.getAlternatifName(0, 0)).toBe("Apartemen 1");
        expect(wsmService.getAlternatifName(0, 1)).toBe("Apartemen 2");
        expect(wsmService.getAlternatifName(0, 2)).toBe("Apartemen 3");
    });

    it("should return criteria alternatif value", () => {
        expect(wsmService.getCriteriaAlternatifValue("Fasilitas pendukung di apartemen", "Apartemen 1")).toBe(2);
        expect(wsmService.getCriteriaAlternatifValue("Fasilitas pendukung di apartemen", "Apartemen 2")).toBe(4);
        expect(wsmService.getCriteriaAlternatifValue("Fasilitas pendukung di apartemen", "Apartemen 3")).toBe(3);
    });

    it("should normalize values", () => {
        const normalizedValue = wsmService.stepNormalizeValue();
        expect(normalizedValue.length).toBe(5);
        expect(normalizedValue[0][0].getValue()).toBeCloseTo(0.5);
        expect(normalizedValue[0][1].getValue()).toBeCloseTo(1);
        expect(normalizedValue[0][2].getValue()).toBeCloseTo(0.8);
        expect(normalizedValue[1][0].getValue()).toBeCloseTo(1);
        expect(normalizedValue[1][1].getValue()).toBeCloseTo(0.7);
        expect(normalizedValue[1][2].getValue()).toBeCloseTo(0.8);
        expect(normalizedValue[2][0].getValue()).toBeCloseTo(1);
        expect(normalizedValue[2][1].getValue()).toBeCloseTo(1);
        expect(normalizedValue[2][2].getValue()).toBeCloseTo(1);
        expect(normalizedValue[3][0].getValue()).toBeCloseTo(0.3);
        expect(normalizedValue[3][1].getValue()).toBeCloseTo(1);
        expect(normalizedValue[3][2].getValue()).toBeCloseTo(0.5);
        expect(normalizedValue[4][0].getValue()).toBeCloseTo(0.8);
        expect(normalizedValue[4][1].getValue()).toBeCloseTo(0.8);
        expect(normalizedValue[4][2].getValue()).toBeCloseTo(1);
    });

    it("should count weighted values", () => {
        const weightedValue = wsmService.stepCountWeightedValue();
        expect(weightedValue.length).toBe(5);
        expect(weightedValue[0][0].getValue()).toBeCloseTo(0.15);
        expect(weightedValue[0][1].getValue()).toBeCloseTo(0.3);
        expect(weightedValue[0][2].getValue()).toBeCloseTo(0.24);
        expect(weightedValue[1][0].getValue()).toBeCloseTo(0.2);
        expect(weightedValue[1][1].getValue()).toBeCloseTo(0.14);
        expect(weightedValue[1][2].getValue()).toBeCloseTo(0.16);
        expect(weightedValue[2][0].getValue()).toBeCloseTo(0.2);
        expect(weightedValue[2][1].getValue()).toBeCloseTo(0.2);
        expect(weightedValue[2][2].getValue()).toBeCloseTo(0.2);
        expect(weightedValue[3][0].getValue()).toBeCloseTo(0.06);
        expect(weightedValue[3][1].getValue()).toBeCloseTo(0.2);
        expect(weightedValue[3][2].getValue()).toBeCloseTo(0.1);
        expect(weightedValue[4][0].getValue()).toBeCloseTo(0.08);
        expect(weightedValue[4][1].getValue()).toBeCloseTo(0.08);
        expect(weightedValue[4][2].getValue()).toBeCloseTo(0.1);
    });

    it("should count WSM values", () => {
        const wsm = wsmService.stepCountWSM();
        expect(wsm["Apartemen 1"]).toBeCloseTo(0.69);
        expect(wsm["Apartemen 2"]).toBeCloseTo(0.92);
        expect(wsm["Apartemen 3"]).toBeCloseTo(0.8);
        
    });

    it("should sort ranking", () => {
        const ranking = wsmService.stepSortRanking();
        expect(ranking.length).toBe(3);
        expect(ranking[0].name).toBe("Apartemen 2");
        expect(ranking[0].ranking).toBe("Ranking 1");
        expect(ranking[0].value).toBeCloseTo(0.92);
        expect(ranking[1].name).toBe("Apartemen 3");
        expect(ranking[1].ranking).toBe("Ranking 2");
        expect(ranking[1].value).toBeCloseTo(0.8);
        expect(ranking[2].name).toBe("Apartemen 1");
        expect(ranking[2].ranking).toBe("Ranking 3");
        expect(ranking[2].value).toBeCloseTo(0.69);
    });
});
