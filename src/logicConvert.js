/**
 * Mengubah koordinat dari format Degree Minute Second (DMS) ke Decimal Degrees (DD).
 * @param {string} dms - Koordinat dalam format DMS 
 * @returns {number} Koordinat dalam format DD.
 */
export function transformDmsToDd(dms) {
	const [degrees, minutes, seconds, direction] = dms.split(" ").map(parseFloat);
	let dd = degrees + minutes / 60 + seconds / (60 * 60);

	if (direction === "S" || direction === "W") {
		dd *= -1;
	} // Invert the result if it is in the south or west

	return dd;
}

/**
 * Fungsi untuk mengubah koordinat dari format Decimal Degrees (DD) ke Degree Minute Second (DMS).
 * @param {number} dd - Koordinat dalam format DD.
 * @returns {string} Koordinat dalam format DMS.
 */
export function transformDdToDms(dd) {
	const degrees = Math.floor(dd);
	const minutes = Math.floor((dd - degrees) * 60);
	const seconds = Math.round((dd - degrees - minutes / 60) * 3600);
	return `${degrees}° ${minutes}' ${seconds}"`;
}
