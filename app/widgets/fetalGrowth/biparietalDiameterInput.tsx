import { FetalGrowthWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { ReferenceTables, computeIntergrowthGraphBiparietalDiameter, computeIntergrowthPercentileBiparietalDiameter, computeOmsGraphBiparietalDiameter, computeOmsPercentileBiparietalDiameter, updateGraph } from "./referenceTables";
import { GraphInput } from "./graphInput";


export const BiparietalDiameterInput = () => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(date: FetalGrowthWidgetProps) => void>((store) => store.setWidgetData);

    const isBiparietalDiameterValid = widgetData?.isBiparietalDiameterValid ?? false;
    const biparietalDiameter = widgetData?.biparietalDiameter ?? 0;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const graphData = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthGraphBiparietalDiameter(Math.trunc(gestationalAge / 7)) :
        computeOmsGraphBiparietalDiameter(Math.trunc(gestationalAge / 7));

    updateGraph(graphData, gestationalAge, biparietalDiameter);

    const biparietalDiameterPercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileBiparietalDiameter(gestationalAge / 7, biparietalDiameter) :
        computeOmsPercentileBiparietalDiameter(gestationalAge / 7, biparietalDiameter);

    const biparietalDiameterPercentileLabel = biparietalDiameterPercentile < 1 ?
        '<1%'
        :
        biparietalDiameterPercentile > 99 ?
            '>99%'
            :
            `${biparietalDiameterPercentile.toFixed(1)}%`;

    const setObserved = (isObservedValid: boolean, observed?: number) => {
        setWidgetData({ ...widgetData, isBiparietalDiameterValid: isObservedValid, biparietalDiameter: observed });
    };

    return (
        <GraphInput
            title="Diametre Bipariétal"
            unit="mm"
            placeholder="Saisir un diamètre"
            graphData={graphData}
            gestationalAge={gestationalAge}
            percentileLabel={biparietalDiameterPercentileLabel}
            observed={biparietalDiameter}
            isObservedValid={isBiparietalDiameterValid}
            setObserved={setObserved}
        />
    );
};