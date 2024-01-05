import { transformDmsToDd, transformDdToDms } from "../logicConvert";
/**
 * Uji konversi DMS ke DD  utara.
 */
test("Konversi DMS ke DD - Belahan Bumi Utara", () => {
	const hasilUtara = transformDmsToDd("49 30 10 N");
	expect(hasilUtara).toBeCloseTo(49.50278);
});

/**
 * Uji konversi DMS ke DD selatan.
 */
test("Konversi DMS ke DD - Belahan Bumi Selatan", () => {
	const hasilSelatan = transformDmsToDd("49 30 10 S");
	expect(hasilSelatan).toBeCloseTo(-49.50278);
});

/**
 * Uji konversi DMS ke DD tenggara.
 */
test("Konversi DMS ke DD - Belahan Bumi Tenggara", () => {
	const hasilTenggara = transformDmsToDd("10 20 30 SE");
	expect(hasilTenggara).toBeCloseTo(-10.34167);
});

/**
 * Uji konversi DD ke DMS untuk nilai positif.
 */
test("Konversi DD ke DMS - Nilai Positif", () => {
	const hasilPositif = transformDdToDms(49.50278);
	expect(hasilPositif).toEqual("49° 30' 10\"");
});

/**
 * Uji konversi DD ke DMS untuk nilai negatif.
 */
test("Konversi DD ke DMS - Nilai Negatif", () => {
	const hasilNegatif = transformDdToDms(-49.50278);
	expect(hasilNegatif).toEqual("-50° 29' 50\"");
});
