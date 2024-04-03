import { createGlobalStyle } from "styled-components";




const GlobalStyle = createGlobalStyle`

*,*::before,*::after,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
h1,h2,h3,h4,h5,h6{
    display: inline-block;
}


body{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Source Sans Pro',sans-serif;
}

pic{
    padding-left: 70% 
    max-height: 100%
}

img_container div {
    position: unset !important;
  }

img {
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }

`

export default GlobalStyle;