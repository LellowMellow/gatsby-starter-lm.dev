import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import "./font.css"

const GlobalStyles = createGlobalStyle`
    ${reset}
    
    * {
        box-sizing: border-box;
        text-decoration: none;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;

        ::selection {
            background: #2383e247;
        }

        scrollbar-color: ${props => props.theme.scrollBarColor};
        ::-webkit-scrollbar {
            background: transparent;
            width: 12px;
            height: 12px;
        }
        ::-webkit-scrollbar-button {
            display: none;
        }
        ::-webkit-scrollbar-thumb {
            background: ${props => props.theme.scrollBarThumb};
            cursor: pointer;
        }
        transition: background-color 0.2s ease;
    }

    html {
        overscroll-behavior: none;
        background-color: ${props => props.theme.background};
    }
    
    body {
        font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        background-color: ${props => props.theme.background};
    }

    button {
        border: none;
        background: none;
        box-sizing: border-box;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    input {
        border: none;
        background: transparent;
        &:focus {
            outline: none;
        }
        &::placeholder {
            color: ${props => props.theme.placeholderColor};
            opacity: 1;
        }
        &::-webkit-input-placeholder {
            color: ${props => props.theme.placeholderColor};
        }
        &:-moz-placeholder {
            color: ${props => props.theme.placeholderColor};
            opacity: 1;
        }
        &::-moz-placeholder {
            color: ${props => props.theme.placeholderColor};
            opacity: 1;
        }
        &:-ms-input-placeholder {
            color: ${props => props.theme.placeholderColor};
        }
    }
`

export default GlobalStyles
