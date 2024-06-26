import React from 'react';
import SkinProps from '../../src/skins/SkinProps';
import { DonutTheme } from '../../src/skins/Donut';
import { BasicTheme } from '../../src/skins/Basic';
import { HighContrastTheme } from '../../src/skins/HighContrast';
import { WhiteTheme } from '../../src/skins/White';
export interface Story {
    (): JSX.Element;
    story?: {
        parameters?: {
            notes?: {
                docs: string;
            };
            options?: {
                showPanel?: boolean;
            };
        };
    };
}
interface DefaultValues {
    min?: number;
    max?: number;
    diameter?: number;
    step?: number;
    value?: number;
    spaceMaxFromZero?: boolean;
}
declare const wrapSkinComponent: (SkinComponent: React.FunctionComponent<SkinProps<DonutTheme | BasicTheme | HighContrastTheme | WhiteTheme | unknown>>, defaults?: DefaultValues, themeProvider?: () => DonutTheme | BasicTheme | HighContrastTheme | WhiteTheme) => Story;
export default wrapSkinComponent;
//# sourceMappingURL=wrapSkinComponent.d.ts.map