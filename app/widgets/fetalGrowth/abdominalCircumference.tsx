import { FetalGrowthWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { ReferenceTables, computeIntergrowthGraphAbdominalCircumference, computeIntergrowthPercentileAbdominalCircumference, computeOmsGraphAbdominalCircumference, computeOmsPercentileAbdominalCircumference, updateGraph } from "./referenceTables";
import { GraphInput } from "./graphInput";


export const AbdominalCircumferenceInput = () => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(date: FetalGrowthWidgetProps) => void>((store) => store.setWidgetData);

    const isAbdominalCircumferenceValid = widgetData?.isAbdominalCircumferenceValid ?? false;
    const abdominalCircumference = widgetData?.abdominalCircumference ?? 0;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const graphData = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthGraphAbdominalCircumference(Math.trunc(gestationalAge / 7)) :
        computeOmsGraphAbdominalCircumference(Math.trunc(gestationalAge / 7));

    updateGraph(graphData, gestationalAge, abdominalCircumference);

    const abdominalCircumferencePercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileAbdominalCircumference(gestationalAge / 7, abdominalCircumference) :
        computeOmsPercentileAbdominalCircumference(gestationalAge / 7, abdominalCircumference);

    const abdominalCircumferencePercentileLabel = abdominalCircumferencePercentile < 1 ?
        '<1%'
        :
        abdominalCircumferencePercentile > 99 ?
            '>99%'
            :
            `${abdominalCircumferencePercentile.toFixed(1)}%`;

    const setObserved = (isObservedValid: boolean, observed?: number) => {
        setWidgetData({ ...widgetData, isAbdominalCircumferenceValid: isObservedValid, abdominalCircumference: observed });
    };

    return (
        <GraphInput
            title="Périmètre Abdominal"
            unit="mm"
            placeholder="Saisir un périmètre"
            graphData={graphData}
            gestationalAge={gestationalAge}
            percentileLabel={abdominalCircumferencePercentileLabel}
            observed={abdominalCircumference}
            isObservedValid={isAbdominalCircumferenceValid}
            setObserved={setObserved}
        />
    );
};