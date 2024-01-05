
import { test,expect } from 'vitest';

import { transformDmsToDd } from './logicConvert';

test("Convert DMS to DD - Northern Hemisphere", () => {
	const result = transformDmsToDd("40 15 30 N");
	expect(result).toBeCloseTo(40.25833);
  });