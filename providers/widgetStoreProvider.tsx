import { createStore } from 'zustand';
import { ReactNode, createContext, useContext } from 'react';
import { StoreApi, useStore } from 'zustand';
import { Widget } from '@/components/widgets';

interface WidgetState {
    widgetInfo: Widget | undefined;
};

interface WidgetActions {
    setWidgetInfo: (info: Widget) => void;
};

export type WidgetStore = WidgetState & WidgetActions

const useWidgetStore = createStore<WidgetStore>((set) => ({
    widgetInfo: undefined,
    setWidgetInfo: (info: Widget) => set({ widgetInfo: info }),
}));

const WidgetStoreContext = createContext<StoreApi<WidgetStore> | undefined>(undefined);

export const WidgetStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <WidgetStoreContext.Provider value={useWidgetStore}>
            {children}
        </WidgetStoreContext.Provider>
    );
};

export const useWidgetStoreContext = <T,>(selector: (store: WidgetStore) => T) => {
    const context = useContext(WidgetStoreContext);
    if (!context) {
        throw new Error('useWidgetStoreContext must be used within a WidgetStoreProvider');
    }
    return useStore(context, selector);
};
