import styled from 'styled-components';

interface FlexProps {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    flex?: string | number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string | number;
    padding?: string;
    margin?: string;
    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    maxWidth?: string | number;
    maxHeight?: string | number;
    overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
    backgroundColor?: string;
}

const Flex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${(props) => props.direction || 'row'};
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    justify-content: ${(props) => props.justifyContent || 'flex-start'};
    align-items: ${(props) => props.alignItems || 'stretch'};
    align-content: ${(props) => props.alignContent || 'stretch'};
    align-self: ${(props) => props.alignSelf || 'auto'};
    flex: ${(props) => props.flex || '0 1 auto'};
    flex-grow: ${(props) => props.flexGrow || 0};
    flex-shrink: ${(props) => props.flexShrink || 1};
    flex-basis: ${(props) => props.flexBasis || 'auto'};
    padding: ${(props) => props.padding || 0};
    margin: ${(props) => props.margin || 0};
    width: ${(props) => props.width || 'auto'};
    height: ${(props) => props.height || 'auto'};
    min-width: ${(props) => props.minWidth || 'auto'};
    min-height: ${(props) => props.minHeight || 'auto'};
    max-width: ${(props) => props.maxWidth || 'none'};
    max-height: ${(props) => props.maxHeight || 'none'};
    overflow: ${(props) => props.overflow || 'visible'};
    background-color: ${(props) => props.backgroundColor || 'transparent'};
`;

export default Flex;
