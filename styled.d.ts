import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            white: string;
            gray: string;
            black: string;
            green: string;
            lightGreen: string;
            lighterGreen: string;
        };
    }
}
