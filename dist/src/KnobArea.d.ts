import { KnobProps } from './Knob';
declare class KnobArea {
    onAngleChange: (number: any) => void;
    onValueChange: (number: any) => void;
    onInteractionChange: (boolean: any) => void;
    min: number;
    max: number;
    step: number;
    diameter: number;
    spaceMaxFromZero: boolean;
    jumpLimit?: number;
    refElement: React.RefObject<HTMLDivElement>;
    windowEventListeners: {
        mouse: Array<['mousemove' | 'mouseup', EventListener]>;
        touch: Array<['touchmove' | 'touchend', EventListener]>;
    };
    private _isInteracting;
    private _value;
    private _angle;
    private _locationX;
    private _locationY;
    constructor(refElement: React.RefObject<HTMLDivElement>, props: KnobProps);
    updateFromProps(props: KnobProps): void;
    get angle(): number;
    set angle(val: number);
    get value(): number;
    set value(val: number);
    get isInteracting(): boolean;
    set isInteracting(val: boolean);
    get numSteps(): number;
    get valsDistribution(): number;
    private getValueWithinJumpLimit;
    private getComputedTransformXY;
    updateAreaLocation(eventCoords: {
        pageX: number;
        pageY: number;
        clientX: number;
        clientY: number;
    }): void;
    calcDegreeOfRotation(pageX: number, pageY: number): number;
    valueFromAngle(angle: number): number;
    angleFromValue(value: number): number;
    updateAngleValue(pageX: number, pageY: number): void;
    handleOnMouseDown: (event: React.MouseEvent) => void;
    handleOnMouseMove: (event: MouseEvent) => void;
    handleOnMouseUp: () => void;
    handleOnTouchStart: (event: React.TouchEvent) => void;
    handleOnTouchMove: (event: TouchEvent) => void;
    handleOnTouchEnd: () => void;
    handleOnFocus: () => void;
    handleOnBlur: () => void;
    handleOnKeyDown: (event: React.KeyboardEvent) => void;
    addWindowEventListeners(group: 'mouse' | 'touch'): void;
    removeWindowEventListeners(group: 'mouse' | 'touch'): void;
}
export default KnobArea;
//# sourceMappingURL=KnobArea.d.ts.map