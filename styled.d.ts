import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            bg: string;
            black: string;
            green: string;
            lightGreen: string;
            lighterGreen: string;
        };
    }
}
