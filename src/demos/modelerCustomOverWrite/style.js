import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    overflow: scroll;

    #container {
        height: 80vh;
        width: 100vw;
    }

    div.buttons {
        position: absolute;
        z-index: 5;
        top: 0;
        right: 0;
    }

    g[data-element-id].hcActive {
        // 控制内部文字高亮
        stroke: red;

        > .djs-visual {
            > rect {
                stroke: red;
            }
        }
    }
`

export const PropertiesPanel = styled.div`
    width: 400px;
    position: fixed;
    top: 50px;
    right: 0;
    background: var(--palette-background-color);
    border: solid 1px var(--palette-border-color);
    border-radius: 2px;

    padding: 20px;
    
    >.row {
        display: flex;
        margin-top: 16px;
        >.label {
            min-width: 150px;
            &::after {
                content: ':'
            }
        }
    }
`
