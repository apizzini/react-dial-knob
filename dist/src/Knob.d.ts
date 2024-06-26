import React from 'react';
import KnobArea from './KnobArea';
export interface KnobProps {
    diameter: number;
    value: number;
    min: number;
    max: number;
    step: number;
    jumpLimit?: number;
    spaceMaxFromZero?: boolean;
    ariaLabelledBy?: string;
    ariaValueText?: string;
    knobStyle?: React.CSSProperties;
    children?: React.ReactNode;
    onAngleChange?: (angle: number) => void;
    onInteractionChange?: (isInteracting: boolean) => void;
    onValueChange?: (value: number) => void;
}
export declare function useKnobAreaClass(props: KnobProps): [React.RefObject<HTMLDivElement>, KnobArea | null, Error | null];
export default function Knob(props: KnobProps): JSX.Element;
//# sourceMappingURL=Knob.d.ts.map