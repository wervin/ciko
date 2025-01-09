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
    Oms: 2
};

export type ReferenceTableType = typeof ReferenceTables[keyof typeof ReferenceTables];

export function pST3(
    q: number,
    mu: number,
    sigma: number,
    nu: number,
    tau: number,
    lowerTail: boolean = true,
    logr: boolean = false
): number {
    const nu2 = nu * nu;
    const e = q - mu;

    // We'll create one StudentT distribution for each call
    const t = new dist.StudentT(tau);

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

function valueToPercentileBirthWeight(ga: string, value: number, gender: string): number {
    const row = INTERGROWTH_DATA_BY_GA[ga]?.[gender];

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


export function computeIntergrowthPercentileBirthWeight(
    age: number,
    observedMeasurement: number,
    sex: SexType
): number {
    const ga = age.toString();
    const gender = sex === Sex.Male ? "Male" : "Female";
    const value = observedMeasurement / 1000.0;

    return age < 33 ? valueToPercentileBirthWeight(ga, value, gender) : valueToPercentileBirthWeightEarly(age, value, sex);
}