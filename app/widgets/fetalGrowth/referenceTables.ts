import * as ss from 'simple-statistics';

export const ReferenceTables = {
    Intergrowth: 1,
    Oms: 2
};

export type ReferenceTableType = typeof ReferenceTables[keyof typeof ReferenceTables];

export interface ReferencePoint extends Record<string, unknown> {
    gaDay: number;
    gaWeek: number;
    observed?: number;
    quantile05: number;
    quantile10: number;
    quantile25: number;
    quantile50: number;
    quantile75: number;
    quantile90: number;
    quantile95: number;
};

interface OmsCoefficient {
    quantile: number;
    b0: number;
    b1: number;
    b2: number;
    b3: number;
    b4: number;
}

const acOmsCoefficients: OmsCoefficient[] = [
    {
        quantile: 0.01,
        b0: 1.19682766661905,
        b1: 0.309985569982485,
        b2: -0.00779821008212983,
        b3: 0.0000721601862187339,
        b4: 0,
    },
    {
        quantile: 0.025,
        b0: 1.19202778944614,
        b1: 0.314756681991964,
        b2: -0.00801581308902169,
        b3: 0.0000751395976546808,
        b4: 0,
    },
    {
        quantile: 0.05,
        b0: 1.09869954558741,
        b1: 0.330079995799838,
        b2: -0.00862095843727276,
        b3: 0.0000825440120054722,
        b4: 0,
    },
    {
        quantile: 0.1,
        b0: 1.24418122481299,
        b1: 0.316315401650234,
        b2: -0.00814092689297361,
        b3: 0.0000772501495178619,
        b4: 0,
    },
    {
        quantile: 0.25,
        b0: 1.44520878528145,
        b1: 0.299433786203949,
        b2: -0.00759672485585945,
        b3: 0.000071668993412344,
        b4: 0,
    },
    {
        quantile: 0.5,
        b0: 1.58552931028045,
        b1: 0.289936781915424,
        b2: -0.00732651929135797,
        b3: 0.000069261631643994,
        b4: 0,
    },
    {
        quantile: 0.75,
        b0: 1.71452506914277,
        b1: 0.281367067786763,
        b2: -0.00708195596502471,
        b3: 0.000067086230433841,
        b4: 0,
    },
    {
        quantile: 0.9,
        b0: 1.78078382317074,
        b1: 0.279278890414784,
        b2: -0.0070643788983289,
        b3: 0.0000676104548969352,
        b4: 0,
    },
    {
        quantile: 0.95,
        b0: 1.83213806223649,
        b1: 0.277106952998102,
        b2: -0.00703388540291938,
        b3: 0.0000676124200964958,
        b4: 0,
    },
    {
        quantile: 0.975,
        b0: 2.03674472691951,
        b1: 0.257138461817474,
        b2: -0.00634918788914223,
        b3: 0.000060053745113196,
        b4: 0,
    },
    {
        quantile: 0.99,
        b0: 2.12378932803127,
        b1: 0.248505815693966,
        b2: -0.00601677942684253,
        b3: 0.0000562286023490798,
        b4: 0,
    },
];

const bpdOmsCoefficients: OmsCoefficient[] = [
    {
        quantile: 0.01,
        b0: 0.591008401542612,
        b1: 0.251833515513537,
        b2: -0.00582602136865785,
        b3: 0.0000485842528593502,
        b4: 0,
    },
    {
        quantile: 0.025,
        b0: 0.58340478243682,
        b1: 0.257706867351367,
        b2: -0.00608380366281251,
        b3: 0.0000516940376186165,
        b4: 0,
    },
    {
        quantile: 0.05,
        b0: 0.640086541374477,
        b1: 0.25352855332296,
        b2: -0.00591651627062447,
        b3: 0.0000494614232987744,
        b4: 0,
    },
    {
        quantile: 0.1,
        b0: 0.67586050811029,
        b1: 0.25343383445191,
        b2: -0.00595606903884204,
        b3: 0.0000503055604381436,
        b4: 0,
    },
    {
        quantile: 0.25,
        b0: 0.769315103415485,
        b1: 0.249927024175735,
        b2: -0.00592399444708251,
        b3: 0.00005076548429269,
        b4: 0,
    },
    {
        quantile: 0.5,
        b0: 0.872984231314326,
        b1: 0.243385003540798,
        b2: -0.00571172523683453,
        b3: 0.0000482880035733658,
        b4: 0,
    },
    {
        quantile: 0.75,
        b0: 0.983298265402666,
        b1: 0.236071116567572,
        b2: -0.00548348083012818,
        b3: 0.0000458419655773418,
        b4: 0,
    },
    {
        quantile: 0.9,
        b0: 1.01351909208103,
        b1: 0.237088857953509,
        b2: -0.0055421492813894,
        b3: 0.0000465258350076297,
        b4: 0,
    },
    {
        quantile: 0.95,
        b0: 1.11401192681678,
        b1: 0.228258457814188,
        b2: -0.00524271052970102,
        b3: 0.0000431665697359201,
        b4: 0,
    },
    {
        quantile: 0.975,
        b0: 1.17917438634649,
        b1: 0.224245686901115,
        b2: -0.00513638678692311,
        b3: 0.0000421401138788865,
        b4: 0,
    },
    {
        quantile: 0.99,
        b0: 1.18876528083144,
        b1: 0.22624188722951,
        b2: -0.00522504825833189,
        b3: 0.0000431577122241698,
        b4: 0,
    },
];

const efwOmsCoefficients: OmsCoefficient[] = [
    {
        quantile: 0.01,
        b0: -0.0501496264869835,
        b1: 0.374471599175392,
        b2: -0.00534930256943893,
        b3: 0.000023744363684445,
        b4: 0,
    },
    {
        quantile: 0.025,
        b0: -0.230518383014592,
        b1: 0.400511116318458,
        b2: -0.00617993235833267,
        b3: 0.0000316595762972649,
        b4: 0,
    },
    {
        quantile: 0.05,
        b0: -0.162057103557898,
        b1: 0.393965369913166,
        b2: -0.00579733056422172,
        b3: 0.0000255319128239087,
        b4: 0,
    },
    {
        quantile: 0.1,
        b0: -0.0455887642525626,
        b1: 0.389314052082164,
        b2: -0.00574527674062641,
        b3: 0.0000265557891064333,
        b4: 0,
    },
    {
        quantile: 0.25,
        b0: -0.012258767992062,
        b1: 0.393836404898322,
        b2: -0.00592304885519551,
        b3: 0.000028863017896588,
        b4: 0,
    },
    {
        quantile: 0.5,
        b0: 0.157310086966445,
        b1: 0.383067935520509,
        b2: -0.00554046846639963,
        b3: 0.0000246570062800598,
        b4: 0,
    },
    {
        quantile: 0.75,
        b0: 0.293297386426919,
        b1: 0.376096229210412,
        b2: -0.00529255036113726,
        b3: 0.0000218372277641981,
        b4: 0,
    },
    {
        quantile: 0.9,
        b0: 0.353142227490073,
        b1: 0.376486874470206,
        b2: -0.00528742945785833,
        b3: 0.0000214760212556463,
        b4: 0,
    },
    {
        quantile: 0.95,
        b0: 0.285025055968914,
        b1: 0.390621472299378,
        b2: -0.00582929182402995,
        b3: 0.0000279088693116937,
        b4: 0,
    },
    {
        quantile: 0.975,
        b0: 0.408170594889372,
        b1: 0.381068214664342,
        b2: -0.00550913922743603,
        b3: 0.0000246713147783532,
        b4: 0,
    },
    {
        quantile: 0.99,
        b0: 0.79584342596075,
        b1: 0.342142215761221,
        b2: -0.00414863204456851,
        b3: 0.0000102097735855226,
        b4: 0,
    },
];

const flOmsCoefficients: OmsCoefficient[] = [
    {
        quantile: 0.01,
        b0: -7.63357391915398,
        b1: 1.32616480908407,
        b2: -0.0603406386286656,
        b3: 0.00127059302964739,
        b4: -0.0000101590910980777,
    },
    {
        quantile: 0.025,
        b0: -7.27187176976836,
        b1: 1.28298928826162,
        b2: -0.0580601892487905,
        b3: 0.00121314319801879,
        b4: -0.00000960171505470123,
    },
    {
        quantile: 0.05,
        b0: -7.07052933404414,
        b1: 1.26780052700097,
        b2: -0.0577556347769781,
        b3: 0.00121608381996396,
        b4: -0.00000970361787292646,
    },
    {
        quantile: 0.1,
        b0: -6.69175407354157,
        b1: 1.22500911064189,
        b2: -0.055920618206786,
        b3: 0.00118320191905997,
        b4: -0.00000950365006831978,
    },
    {
        quantile: 0.25,
        b0: -6.07953118554742,
        b1: 1.15245170563351,
        b2: -0.0525510654314434,
        b3: 0.00111418613323875,
        b4: -0.0000089802280974713,
    },
    {
        quantile: 0.5,
        b0: -5.54922620776446,
        b1: 1.09559990166124,
        b2: -0.0501310925949098,
        b3: 0.0010678072569586,
        b4: -0.00000863970606288493,
    },
    {
        quantile: 0.75,
        b0: -4.68666987282664,
        b1: 0.978111793398168,
        b2: -0.0439319069083821,
        b3: 0.00092346644003072,
        b4: -0.00000739427758542544,
    },
    {
        quantile: 0.9,
        b0: -4.31219596825529,
        b1: 0.94038705308254,
        b2: -0.0424709867520927,
        b3: 0.00089977742409265,
        b4: -0.00000726284658350453,
    },
    {
        quantile: 0.95,
        b0: -4.12398207550525,
        b1: 0.920344210800571,
        b2: -0.0415728969581384,
        b3: 0.000881055511995407,
        b4: -0.00000710843959625547,
    },
    {
        quantile: 0.975,
        b0: -3.64483930811801,
        b1: 0.857028131514986,
        b2: -0.0384005685481303,
        b3: 0.000812062784461527,
        b4: -0.00000655932416998498,
    },
    {
        quantile: 0.99,
        b0: -3.40004123807778,
        b1: 0.834596760116344,
        b2: -0.0376568882663223,
        b3: 0.000803601513837836,
        b4: -0.00000655323852770109,
    },
];

const hcOmsCoefficients: OmsCoefficient[] = [
    {
        quantile: 0.01,
        b0: 1.51782795874402,
        b1: 0.299296859125438,
        b2: -0.00752376152126206,
        b3: 0.000067179373384666,
        b4: 0,
    },
    {
        quantile: 0.025,
        b0: 1.59317517131532,
        b1: 0.29459800552433,
        b2: -0.0073860372566707,
        b3: 0.0000656951770216148,
        b4: 0,
    },
    {
        quantile: 0.05,
        b0: 1.74883945698398,
        b1: 0.278405280785763,
        b2: -0.00677990950687641,
        b3: 0.0000583587774721548,
        b4: 0,
    },
    {
        quantile: 0.1,
        b0: 1.83059537388222,
        b1: 0.27244251174974,
        b2: -0.00659546864496838,
        b3: 0.0000563957469365128,
        b4: 0,
    },
    {
        quantile: 0.25,
        b0: 1.94181945227701,
        b1: 0.26584757167445,
        b2: -0.00644544904011178,
        b3: 0.0000554517813431795,
        b4: 0,
    },
    {
        quantile: 0.5,
        b0: 2.09924879247164,
        b1: 0.253373656106037,
        b2: -0.00605647816678282,
        b3: 0.0000514256072059917,
        b4: 0,
    },
    {
        quantile: 0.75,
        b0: 2.20777451923048,
        b1: 0.245212320927953,
        b2: -0.00578557948587613,
        b3: 0.0000483972618799514,
        b4: 0,
    },
    {
        quantile: 0.9,
        b0: 2.31776999721364,
        b1: 0.236651510200538,
        b2: -0.00550781288608926,
        b3: 0.0000453975879344267,
        b4: 0,
    },
    {
        quantile: 0.95,
        b0: 2.39550106176494,
        b1: 0.229586666082063,
        b2: -0.00525318141633775,
        b3: 0.0000423738937924844,
        b4: 0,
    },
    {
        quantile: 0.975,
        b0: 2.50074069629423,
        b1: 0.220067854715719,
        b2: -0.00493623111462443,
        b3: 0.0000389066000946519,
        b4: 0,
    },
    {
        quantile: 0.99,
        b0: 2.50189533265806,
        b1: 0.223785148311865,
        b2: -0.00514245402239348,
        b3: 0.0000420117020605557,
        b4: 0,
    },
];

function computeExpectedMeasurement(
    age: number,
    coeffs: OmsCoefficient
): { measurement: number; logeMeasurement: number } {
    const { b0, b1, b2, b3, b4 } = coeffs;
    const logeY =
        b0 +
        b1 * age +
        b2 * Math.pow(age, 2) +
        b3 * Math.pow(age, 3) +
        b4 * Math.pow(age, 4);
    const y = Math.exp(logeY);
    return { measurement: y, logeMeasurement: logeY };
}

function computeQuantileMeasurements(
    age: number,
    coefficients: OmsCoefficient[]
): { quantile: number; measurement: number; logeMeasurement: number }[] {
    return coefficients.map((coeff) => {
        const { measurement, logeMeasurement } = computeExpectedMeasurement(
            age,
            coeff
        );
        return {
            quantile: coeff.quantile,
            measurement,
            logeMeasurement,
        };
    });
}

function interpolatePercentile(
    observedMeasurement: number,
    quantileMeasurements: {
        quantile: number;
        measurement: number;
        logeMeasurement: number;
    }[]
): number {
    // Sort the measurements in ascending order of logeMeasurement
    quantileMeasurements.sort((a, b) => a.logeMeasurement - b.logeMeasurement);

    const logeObserved = Math.log(observedMeasurement);

    if (logeObserved < quantileMeasurements[0].logeMeasurement)
        return 0;

    if (logeObserved > quantileMeasurements[quantileMeasurements.length - 1].logeMeasurement)
        return 1;

    if (logeObserved == quantileMeasurements[0].logeMeasurement)
        return quantileMeasurements[0].quantile;

    if (logeObserved == quantileMeasurements[quantileMeasurements.length - 1].logeMeasurement)
        return quantileMeasurements[quantileMeasurements.length - 1].quantile;

    // Find the quantiles between which the observed logeMeasurement falls
    for (let i = 0; i < quantileMeasurements.length - 1; i++) {
        const lower = quantileMeasurements[i];
        const upper = quantileMeasurements[i + 1];

        if (logeObserved >= lower.logeMeasurement && logeObserved <= upper.logeMeasurement) {

            const alpha = lower.quantile +
                ((logeObserved - lower.logeMeasurement) / (upper.logeMeasurement - lower.logeMeasurement))
                * (upper.quantile - lower.quantile);
            return alpha;
        }
    }

    return -1;
}

function computeOmsPercentile(
    age: number,
    observedMeasurement: number,
    coefficients: OmsCoefficient[]
): number {
    const quantileMeasurements = computeQuantileMeasurements(age, coefficients);
    const percentile = interpolatePercentile(
        observedMeasurement,
        quantileMeasurements
    );
    return percentile * 100;
}

function computeZScore(
    observedValue: number,
    mean: number,
    sd: number
): number {
    return (observedValue - mean) / sd;
}

function percentileFromZScore(z: number): number {
    return ss.cumulativeStdNormalProbability(z) * 100;
}

function zScoreFromPercentile(percentile: number): number {
    return ss.probit(percentile / 100);
}

function computePercentileValue(
    mean: number,
    sd: number,
    zScore: number
): number {
    return mean + zScore * sd;
}

function meanHC(age: number): number {
    const squared = Math.pow(age, 2);
    return (
        -28.2849 +
        1.69267 * squared -
        0.397485 * squared * Math.log(age)
    );
}

function sdHC(age: number): number {
    const cubed = Math.pow(age, 3);
    const ln = Math.log(age);
    const ln_squared = Math.pow(ln, 2);
    return (
        1.98735 +
        0.0136772 * cubed -
        0.00726264 * cubed * ln +
        0.000976253 * cubed * ln_squared
    );
}

function percentileHC(
    age: number,
    desiredPercentile: number
): number {
    const mean = meanHC(age);
    const sd = sdHC(age);
    const z = zScoreFromPercentile(desiredPercentile);
    return computePercentileValue(mean, sd, z);
}

function meanBPD(age: number): number {
    const squared = Math.pow(age, 2);
    const cubed = Math.pow(age, 3);
    return 5.60878 + 0.158369 * squared - 0.00256379 * cubed;
}

function sdBPD(age: number): number {
    const cubed = Math.pow(age, 3);
    const ln = Math.log(age);
    const ln_squared = Math.pow(ln, 2);
    const exponent =
        0.101242 +
        0.00150557 * cubed -
        0.000771535 * cubed * ln +
        0.0000999638 * cubed * ln_squared;
    return Math.exp(exponent);
}

function percentileBPD(
    age: number,
    desiredPercentile: number
): number {
    const mean = meanBPD(age);
    const sd = sdBPD(age);
    const z = zScoreFromPercentile(desiredPercentile);
    return computePercentileValue(mean, sd, z);
}

function meanAC(age: number): number {
    const cubed = Math.pow(age, 3);
    return (
        -81.3243 + 11.6772 * age - 0.000561865 * cubed
    );
}

function sdAC(age: number): number {
    const squared = Math.pow(age, 2);
    const cubed = Math.pow(age, 3);
    const ln = Math.log(age);
    return (
        -4.36302 +
        0.121445 * squared -
        0.0130256 * cubed +
        0.00282143 * cubed * ln
    );
}

function percentileAC(
    age: number,
    desiredPercentile: number
): number {
    const mean = meanAC(age);
    const sd = sdAC(age);
    const z = zScoreFromPercentile(desiredPercentile);
    return computePercentileValue(mean, sd, z);
}

function meanFL(age: number): number {
    return (
        -39.9616 + 4.32298 * age - 0.0380156 * Math.pow(age, 2)
    );
}

function sdFL(age: number): number {
    const inverse_squared = Math.pow(age, -2);
    const cubed = Math.pow(age, 3);
    const exponent =
        0.605843 -
        42.0014 * inverse_squared +
        0.00000917972 * cubed;
    return Math.exp(exponent);
}

function percentileFL(
    age: number,
    desiredPercentile: number
): number {
    const mean = meanFL(age);
    const sd = sdFL(age);
    const z = zScoreFromPercentile(desiredPercentile);
    return computePercentileValue(mean, sd, z);
}

function skewnessEFW(age: number): number {
    const div = age / 10;
    const inverseSquare = Math.pow(div, -2);
    const logDiv = Math.log(div);
    return (
        9.43643 +
        9.41579 * inverseSquare -
        83.5422 * logDiv * inverseSquare
    );
}

function meanEFW(age: number): number {
    return (
        -2.42272 +
        1.86478 * Math.sqrt(age) -
        1.93299e-5 * Math.pow(age, 3)
    );
}

function sdEFW(age: number): number {
    const div = age / 10;
    const inverseSquare = Math.pow(div, -2);
    const logDiv = Math.log(div);
    return (
        0.0193557 +
        0.0310716 * inverseSquare -
        0.0657587 * logDiv * inverseSquare
    );
}

function zScoreEFW(
    Y: number,
    mu: number,
    sigma: number,
    lambda: number
): number {
    if (lambda === 0)
        return Math.log(Y / mu) / sigma;

    return (
        (Math.pow(Y / mu, lambda) - 1) /
        (sigma * lambda)
    );
}

function computePercentileValueEFW(lambda: number, mu: number, sigma: number, zScore: number): number {
    if (lambda === 0) {
        // Use the formula for λ(GA) = 0
        const logC = mu * Math.exp(sigma * zScore);
        const EFW = Math.exp(logC);
        return EFW;
    }

    // Use the formula for λ(GA) ≠ 0
    const innerTerm = sigma * lambda * zScore + 1;
    if (innerTerm <= 0) {
        return 0;
    }

    const power = 1 / lambda;
    const logC = mu * Math.pow(innerTerm, power);
    const EFW = Math.exp(logC);
    return EFW;
}

function percentileEFW(
    age: number,
    desiredPercentile: number
): number {
    const lambda = skewnessEFW(age);
    const mu = meanEFW(age);
    const sigma = sdEFW(age);
    const z = zScoreFromPercentile(desiredPercentile);
    return computePercentileValueEFW(lambda, mu, sigma, z);
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

export function computeOmsPercentileAbdominalCircumference(
    age: number,
    observedMeasurement: number
): number {
    return computeOmsPercentile(age, observedMeasurement, acOmsCoefficients);
}

export function computeIntergrowthPercentileAbdominalCircumference(
    age: number,
    observedMeasurement: number
): number {
    const mean = meanAC(age);
    const sd = sdAC(age);
    const z = computeZScore(observedMeasurement, mean, sd);
    const percentile = percentileFromZScore(z);
    return percentile;
}

export function computeOmsPercentileBiparietalDiameter(
    age: number,
    observedMeasurement: number
): number {
    return computeOmsPercentile(age, observedMeasurement, bpdOmsCoefficients);
}

export function computeIntergrowthPercentileBiparietalDiameter(
    age: number,
    observedMeasurement: number
): number {
    const mean = meanBPD(age);
    const sd = sdBPD(age);
    const z = computeZScore(observedMeasurement, mean, sd);
    const percentile = percentileFromZScore(z);
    return percentile;
}

export function computeOmsPercentileFemurLength(
    age: number,
    observedMeasurement: number
): number {
    return computeOmsPercentile(age, observedMeasurement, flOmsCoefficients);
}

export function computeIntergrowthPercentileFemurLength(
    age: number,
    observedMeasurement: number
): number {
    const mean = meanFL(age);
    const sd = sdFL(age);
    const z = computeZScore(observedMeasurement, mean, sd);
    const percentile = percentileFromZScore(z);
    return percentile;
}

export function computeOmsGraphHeadCircumference(
    age: number
): ReferencePoint[] {
    const start = (age - 2) * 7;
    const end = (age + 2) * 7;

    return Array.from({ length: (end - start + 1) }, (_, i) => {
        const ga = (i + start) / 7;

        return {
            gaDay: i + start,
            gaWeek: ga,
            quantile05: computeExpectedMeasurement(ga, hcOmsCoefficients[2]).measurement,
            quantile10: computeExpectedMeasurement(ga, hcOmsCoefficients[3]).measurement,
            quantile25: computeExpectedMeasurement(ga, hcOmsCoefficients[4]).measurement,
            quantile50: computeExpectedMeasurement(ga, hcOmsCoefficients[5]).measurement,
            quantile75: computeExpectedMeasurement(ga, hcOmsCoefficients[6]).measurement,
            quantile90: computeExpectedMeasurement(ga, hcOmsCoefficients[7]).measurement,
            quantile95: computeExpectedMeasurement(ga, hcOmsCoefficients[8]).measurement,
        };
    });
}

export function computeIntergrowthGraphHeadCircumference(
    age: number
): ReferencePoint[] {
    const start = (age - 2) * 7;
    const end = (age + 2) * 7;

    return Array.from({ length: (end - start + 1) }, (_, i) => {
        const ga = (i + start) / 7;
        return {
            gaDay: i + start,
            gaWeek: ga,
            quantile05: percentileHC(ga, 5),
            quantile10: percentileHC(ga, 10),
            quantile25: percentileHC(ga, 25),
            quantile50: percentileHC(ga, 50),
            quantile75: percentileHC(ga, 75),
            quantile90: percentileHC(ga, 90),
            quantile95: percentileHC(ga, 95),
        };
    });
}

export function computeOmsPercentileHeadCircumference(
    age: number,
    observedMeasurement: number
): number {
    return computeOmsPercentile(age, observedMeasurement, hcOmsCoefficients);
}

export function computeIntergrowthPercentileHeadCircumference(
    age: number,
    observedMeasurement: number
): number {
    const mean = meanHC(age);
    const sd = sdHC(age);
    const z = computeZScore(observedMeasurement, mean, sd);
    const percentile = percentileFromZScore(z);
    return percentile;
}

export function computeOmsPercentileEstimatedFetalWeight(
    age: number,
    observedMeasurement: number
): number {
    return computeOmsPercentile(age, observedMeasurement, efwOmsCoefficients);
}

export function computeIntergrowthPercentileEstimatedFetalWeight(
    age: number,
    observedMeasurement: number
): number {
    const lambda = skewnessEFW(age);
    const mu = meanEFW(age);
    const sigma = sdEFW(age);
    const Y = Math.log(observedMeasurement);
    const Z = zScoreEFW(Y, mu, sigma, lambda);
    return percentileFromZScore(Z);
}