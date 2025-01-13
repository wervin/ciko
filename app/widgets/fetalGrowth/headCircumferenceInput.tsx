import { FetalGrowthWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { ReferenceTables, computeIntergrowthGraphHeadCircumference, computeIntergrowthPercentileHeadCircumference, computeOmsGraphHeadCircumference, computeOmsPercentileHeadCircumference, updateGraph } from "./referenceTables";
import { GraphInput } from "../../../components/graphInput";


export const HeadCircumferenceInput = () => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(date: FetalGrowthWidgetProps) => void>((store) => store.setWidgetData);

    const isHeadCircumferenceValid = widgetData?.isHeadCircumferenceValid ?? false;
    const headCircumference = widgetData?.headCircumference ?? 0;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const graphData = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthGraphHeadCircumference(Math.trunc(gestationalAge / 7)) :
        computeOmsGraphHeadCircumference(Math.trunc(gestationalAge / 7));

    updateGraph(graphData, gestationalAge, headCircumference);

    const headCircumferencePercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileHeadCircumference(gestationalAge / 7, headCircumference) :
        computeOmsPercentileHeadCircumference(gestationalAge / 7, headCircumference);

    const headCircumferencePercentileLabel = headCircumferencePercentile < 1 ?
        '<1%'
        :
        headCircumferencePercentile > 99 ?
            '>99%'
            :
            `${headCircumferencePercentile.toFixed(1)}%`;

    const setObserved = (isObservedValid: boolean, observed?: number) => {
        setWidgetData({ ...widgetData, isHeadCircumferenceValid: isObservedValid, headCircumference: observed });
    };

    return (
        <GraphInput
            title="Périmètre Crânien"
            unit="mm"
            placeholder="Saisir un périmètre"
            graphData={graphData}
            gestationalAge={gestationalAge}
            percentileLabel={headCircumferencePercentileLabel}
            observed={headCircumference}
            isObservedValid={isHeadCircumferenceValid}
            setObserved={setObserved}
        />
    );
};