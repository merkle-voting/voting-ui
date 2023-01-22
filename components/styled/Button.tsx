import styled from 'styled-components';

interface ButtonProps {
    color?: string;
    bgColor?: string;
    padding?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeigth?: string;
    hoverBgColor?: string;
    hoverColor?: string;
    display?: 'inline' | 'inline-block' | 'block';
}

const Button = styled.button<ButtonProps>`
    color: ${(props) => props.color || '#fff'};
    background-color: ${(props) => props.bgColor || '#000'};
    padding: ${(props) => props.padding || '10px 20px'};
    border-radius: ${(props) => props.borderRadius || '4px'};
    border: none;
    font-size: ${(props) => props.fontSize || '14px'};
    font-weight: ${(props) => props.fontWeigth || 'normal'};
    display: ${(props) => props.display || 'inline-block'};
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${(props) => props.hoverBgColor || props.bgColor};
        color: ${(props) => props.hoverColor || props.color};
    }
`;

export default Button;
