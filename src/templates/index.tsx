import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {css} from '@leafygreen-ui/emotion'

const CDN = 'https://d2va9gm4j17fy9.cloudfront.net';
const fontsURL = `${CDN}/fonts`;

export const globalStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    src: url('${fontsURL}/akzidgrostdreg.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdreg.eot?#iefix')
        format('embedded-opentype'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdreg.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdreg.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: 600;
    src: url('${fontsURL}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('${fontsURL}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    src: url('${fontsURL}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('${fontsURL}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  html {
    font-family: 'Akzidenz', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;


ReactDOM.render(
  <React.StrictMode>
    <div className={globalStyles} >
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
