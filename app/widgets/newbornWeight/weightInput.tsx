import { NewbornWeightWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { ReferenceTables, computeIntergrowthPercentileBirthWeight, computeIntergrowthGraphBirthWeight } from "./referenceTables";
import { GraphInput } from "./graphInput";
import { Sex } from "./sexInput";

export const WeightInput = () => {
    const widgetData = useWidgetStoreContext<NewbornWeightWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(date: NewbornWeightWidgetProps) => void>((store) => store.setWidgetData);

    const isWeightValid = widgetData?.isWeightValid ?? false;
    const weight = widgetData?.weight ?? 0;
    const sex = widgetData?.sex ?? Sex.Male;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const graphData = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthGraphBirthWeight(gestationalAge, sex) : undefined;

    const weightPercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileBirthWeight(gestationalAge, weight, sex) :
        0;

    const weightPercentileLabel = weightPercentile < 1 ?
        '<1%'
        :
        weightPercentile > 99 ?
            '>99%'
            :
            `${weightPercentile.toFixed(1)}%`;

    const setObserved = (isObservedValid: boolean, observed?: number) => {
        setWidgetData({ ...widgetData, isWeightValid: isObservedValid, weight: observed });
    };

    return (
        <GraphInput
            title="Poids"
            unit="g"
            placeholder="Saisir le poids"
            graphData={graphData}
            gestationalAge={gestationalAge}
            percentileLabel={weightPercentileLabel}
            observed={weight}
            isObservedValid={isWeightValid}
            setObserved={setObserved}
        />
    );
};