interface StatefulNumberKnobOptions {
    range?: boolean;
    min?: number;
    max?: number;
    step?: number;
}
export default function useNumberState(label: string, defaultVal: number, options?: StatefulNumberKnobOptions, groupID?: string): [number, (value: number) => void];
export {};
//# sourceMappingURL=useNumberState.d.ts.map