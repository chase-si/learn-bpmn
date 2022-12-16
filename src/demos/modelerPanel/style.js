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
`
