import { FetalGrowthWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { ReferenceTables, computeIntergrowthGraphFemurLength, computeIntergrowthPercentileFemurLength, computeOmsGraphFemurLength, computeOmsPercentileFemurLength, updateGraph } from "./referenceTables";
import { GraphInput } from "./graphInput";


export const FemurLengthInput = () => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(date: FetalGrowthWidgetProps) => void>((store) => store.setWidgetData);

    const isFemurLengthValid = widgetData?.isFemurLengthValid ?? false;
    const femurLength = widgetData?.femurLength ?? 0;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const graphData = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthGraphFemurLength(Math.trunc(gestationalAge / 7)) :
        computeOmsGraphFemurLength(Math.trunc(gestationalAge / 7));

    updateGraph(graphData, gestationalAge, femurLength);

    const femurLengthPercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileFemurLength(gestationalAge / 7, femurLength) :
        computeOmsPercentileFemurLength(gestationalAge / 7, femurLength);

    const femurLengthPercentileLabel = femurLengthPercentile < 1 ?
        '<1%'
        :
        femurLengthPercentile > 99 ?
            '>99%'
            :
            `${femurLengthPercentile.toFixed(1)}%`;

    const setObserved = (isObservedValid: boolean, observed?: number) => {
        setWidgetData({ ...widgetData, isFemurLengthValid: isObservedValid, femurLength: observed });
    };

    return (
        <GraphInput
            title="Longueur Fémorale"
            unit="mm"
            placeholder="Saisir une longueur"
            graphData={graphData}
            gestationalAge={gestationalAge}
            percentileLabel={femurLengthPercentileLabel}
            observed={femurLength}
            isObservedValid={isFemurLengthValid}
            setObserved={setObserved}
        />
    );
};