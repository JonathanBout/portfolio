import type { Locale, Localized } from "."

export const months: Localized<string[]> = {
    en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    nl: [
        "januari",
        "februari",
        "maart",
        "april",
        "mei",
        "juni",
        "juli",
        "augustus",
        "september",
        "oktober",
        "november",
        "december"
    ]
}

// export shortMonths and use TS to shorten the month names
export const shortMonths: Localized<string[]> = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    nl: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
}

export const days: Localized<string[]> = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    nl: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
}

export const shortDays: Localized<string[]> = {
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    nl: ["zo", "ma", "di", "wo", "do", "vr", "za"]
}

export const timeframes: Localized = {
    en: {
        present: "present"
    },
    nl: {
        present: "nu"
    }
}

export function formatDate(
    date: Date | undefined,
    lang: Locale,
    includeDayName: boolean = true,
    includeDayNumber: boolean = true,
    includeMonth: boolean = true,
    includeYear: boolean = true
): string {
    if (!date) return ""

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const monthName = months[lang][month % months[lang].length]
    const dayName = days[lang][(day + 2) % days[lang].length]

    let result = ""

    if (lang == "en") {
        if (includeMonth) {
            if (includeDayName && includeDayNumber) result += `${dayName}, `
            result += `${monthName} `
            if (includeDayNumber) result += `${day} `
        } else if (includeDayName) {
            result += `${dayName} `
        } else if (includeDayNumber) {
            result += `${day} `
        }

        if (includeYear) result += `${year}`
    } else if (lang == "nl") {
        if (includeMonth) {
            if (includeDayNumber) {
                if (includeDayName) result += `${dayName} `
                result += `${day} `
            }

            result += `${monthName} `
        } else if (includeDayName) {
            result += `${dayName} `
        } else if (includeDayNumber) {
            result += `${day} `
        }

        if (includeYear) result += `${year}`
    }

    return result
        .replace(/\s+$/, "")
        .replace(/\s{2,}/g, " ")
        .replace(/,$/, "")
}
