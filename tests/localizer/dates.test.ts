import * as dates from '../../src/localizer/dates'

import { expect, test } from 'vitest'

test('date is formatted correctly', () => {
    expect(dates.formatDate(new Date(2025, 0, 1), "en", true, true, true, true)).toBe("Wednesday, January 1 2025")
    expect(dates.formatDate(new Date(2025, 0, 1), "nl", true, true, true, true)).toBe("woensdag 1 januari 2025")
    expect(dates.formatDate(new Date(2025, 0, 1), "en", false, false, false, true)).toBe("2025")
    expect(dates.formatDate(new Date(2025, 0, 1), "nl", false, false, false, true)).toBe("2025")

    expect(dates.formatDate(new Date(2025, 0, 5), "en", true, false, false, false)).toBe("Sunday")
    expect(dates.formatDate(new Date(2025, 0, 5), "nl", true, false, false, false)).toBe("zondag")

    expect(dates.formatDate(new Date(2025, 0, 5), "en", false, true, false, false)).toBe("5")
})