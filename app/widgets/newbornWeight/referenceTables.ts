import { INTERGROWTH_DATA_BY_GA } from './intergrowthData';
import { dist } from 'ranjs'
import { Sex, SexType } from './sexInput';

export interface ReferencePoint extends Record<string, unknown> {
    gaDay: number;
    observed?: number;
    quantile05: number;
    quantile10: number;
    quantile25: number;
    quantile50: number;
    quantile75: number;
    quantile90: number;
    quantile95: number;
};

export const ReferenceTables = {
    Intergrowth: 1,
    Audipog: 2
};

export type ReferenceTableType = typeof ReferenceTables[keyof typeof ReferenceTables];

function pST3(
    q: number,
    mu: number,
    sigma: number,
    nu: number,
    tau: number,
    lowerTail: boolean = true,
    logr: boolean = false
): number {
    // We'll create one StudentT distribution for each call
    const t = new dist.StudentT(tau);

    const nu2 = nu * nu;
    const e = q - mu;

    // cdf1 = 2 * t.cdf(nu * e / sigma, tau)
    const cdf1 = 2.0 * t.cdf((nu * e) / sigma);

    // cdf2 = 1 + 2 * nu^2 * (t.cdf(e / (sigma * nu), tau) - 0.5)
    const cdf2 =
        1.0 + 2.0 * nu2 * (t.cdf(e / (sigma * nu)) - 0.5);

    // Choose cdf1 if e < 0, otherwise cdf2
    let cdf = e < 0 ? cdf1 : cdf2;

    // Divide by (1 + nu^2)
    cdf /= (1.0 + nu2);

    // If not lower_tail, take the complement
    if (!lowerTail) {
        cdf = 1.0 - cdf;
    }

    // If logr, return log
    return logr ? Math.log(cdf) : cdf;
}


function qST3(
    p: number,
    mu: number,
    sigma: number,
    nu: number,
    tau: number,
    lowerTail: boolean = true,
    logr: boolean = false
): number {
    const t = new dist.StudentT(tau);

    // nu^2
    const nu2 = nu * nu;

    // 1) If p is given in log scale, exponentiate it
    let xp = logr ? Math.exp(p) : p;

    // 2) If not lower tail, flip the probability
    xp = lowerTail ? xp : 1.0 - xp;

    // 3) Calculate the first candidate quantile (q1)
    //    q1 = mu + (sigma / nu) * t.ppf(xp * (1 + nu2) / 2, df=tau)
    const q1 =
        mu +
        (sigma / nu) * (t.q((xp * (1.0 + nu2)) / 2.0) ?? 0);

    // 4) Calculate the second candidate quantile (q2)
    //    q2 = mu + (sigma * nu) * t.ppf(((xp*(1 + nu2) - 1) / (2*nu^2)) + 0.5, df=tau)
    const q2 =
        mu +
        (sigma * nu) *
        (t.q(((xp * (1.0 + nu2) - 1.0) / (2.0 * nu2)) + 0.5) ?? 0);

    // 5) Decide which quantile to return
    //    threshold = 1 / (1 + nu^2)
    //    If xp < threshold, use q1; otherwise, use q2
    const threshold = 1.0 / (1.0 + nu2);
    const q = xp < threshold ? q1 : q2;

    return q;
}

function percentileToValueBirthWeight(ga: number, value: number, gender: SexType): number {
    const row = INTERGROWTH_DATA_BY_GA[ga.toString()]?.[gender === Sex.Male ? "Male" : "Female"];

    const mu = Number(row.mu);
    const sigma = Number(row.sigma);
    const nu = Number(row.nu);
    const tau = Number(row.tau);

    return qST3(value / 100, mu, sigma, nu, tau) * 1000;
}

function percentileToValueBirthWeightEarly(ga: number, value: number, gender: SexType): number {
    const coefs = [-7.003, 1.3259, 0.0572];
    const sigma = 0.193;

    // 1. Build the design vector: [1.0, sqrt(x/7), indicator(Male)]
    const frm = [
        1.0,
        Math.sqrt(ga / 7.0),
        gender === Sex.Male ? 1.0 : 0.0,
    ];

    // 2. Dot product to get mu
    //    mu = frm . myCoefs.coefs
    const mu =
        frm[0] * coefs[0] +
        frm[1] * coefs[1] +
        frm[2] * coefs[2];

    // 3. Compute normal CDF of log(y), mean=mu, sd=myCoefs.sigma
    const n = new dist.Normal(mu, sigma);
    const result = n.q(value / 100) ?? 0;
    return Math.exp(result) * 1000;
}

function valueToPercentileBirthWeight(ga: number, value: number, gender: SexType): number {
    const row = INTERGROWTH_DATA_BY_GA[ga.toString()]?.[gender === Sex.Male ? "Male" : "Female"];

    const mu = Number(row.mu);
    const sigma = Number(row.sigma);
    const nu = Number(row.nu);
    const tau = Number(row.tau);

    return pST3(value, mu, sigma, nu, tau) * 100;
}

function valueToPercentileBirthWeightEarly(ga: number, value: number, gender: SexType): number {
    const coefs = [-7.003, 1.3259, 0.0572];
    const sigma = 0.193;

    // 1. Build the design vector: [1.0, sqrt(x/7), indicator(Male)]
    const frm = [
        1.0,
        Math.sqrt(ga / 7.0),
        gender === Sex.Male ? 1.0 : 0.0,
    ];

    // 2. Dot product to get mu
    //    mu = frm . myCoefs.coefs
    const mu =
        frm[0] * coefs[0] +
        frm[1] * coefs[1] +
        frm[2] * coefs[2];

    // 3. Compute normal CDF of log(y), mean=mu, sd=myCoefs.sigma
    const n = new dist.Normal(mu, sigma);
    const result = n.cdf(Math.log(value)) * 100;

    return result;
}

export function updateGraph(
    points: ReferencePoint[],
    day: number,
    observed: number
): void {
    const point = points.find(p => p.gaDay === day);
    if (point)
        point.observed = observed;
}

export function computeIntergrowthPercentileBirthWeight(
    age: number,
    observedMeasurement: number,
    sex: SexType
): number {
    const ga = Math.min(300, Math.max(168, age));
    const value = observedMeasurement / 1000.0;
    return ga < 231 ? valueToPercentileBirthWeightEarly(ga, value, sex) : valueToPercentileBirthWeight(ga, value, sex);
}

export function computeIntergrowthGraphBirthWeight(
    age: number,
    sex: SexType
): ReferencePoint[] {
    const start = Math.min(300, Math.max(168, age - 14));
    const end = Math.min(300, Math.max(168, age + 14));

    return Array.from({ length: (end - start + 1) }, (_, i) => {
        const ga = i + start;
        return {
            gaDay: ga,
            quantile05: ga < 231 ? percentileToValueBirthWeightEarly(ga, 5, sex) : percentileToValueBirthWeight(ga, 5, sex),
            quantile10: ga < 231 ? percentileToValueBirthWeightEarly(ga, 10, sex) : percentileToValueBirthWeight(ga, 10, sex),
            quantile25: ga < 231 ? percentileToValueBirthWeightEarly(ga, 25, sex) : percentileToValueBirthWeight(ga, 25, sex),
            quantile50: ga < 231 ? percentileToValueBirthWeightEarly(ga, 50, sex) : percentileToValueBirthWeight(ga, 50, sex),
            quantile75: ga < 231 ? percentileToValueBirthWeightEarly(ga, 75, sex) : percentileToValueBirthWeight(ga, 75, sex),
            quantile90: ga < 231 ? percentileToValueBirthWeightEarly(ga, 90, sex) : percentileToValueBirthWeight(ga, 90, sex),
            quantile95: ga < 231 ? percentileToValueBirthWeightEarly(ga, 95, sex) : percentileToValueBirthWeight(ga, 95, sex),
        };
    });
}