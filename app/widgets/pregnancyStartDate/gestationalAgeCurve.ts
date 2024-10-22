export const GestationalAgeCurves = {
    Intergrowth: 1,
    Robinson: 2
};

export type GestationalAgeCurveType = typeof GestationalAgeCurves[keyof typeof GestationalAgeCurves];

export const gestationalAgeRobinson = (crl: number) => {
    return Math.round(8.052 * Math.sqrt(crl * 1.037) + 23.73);
}

export const gestationalAgeIntergrowth = (crl: number) => {
    return Math.round(40.9041 + 3.21585 * Math.sqrt(crl) + 0.348956 * crl)
}

export const gestationalAge = (crl: number, curve: GestationalAgeCurveType) => {
    return curve === GestationalAgeCurves.Robinson ? gestationalAgeRobinson(crl) : gestationalAgeIntergrowth(crl)
};