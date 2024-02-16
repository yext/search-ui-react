import { StrictMode } from 'react';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { renderReact } from './utils/renderReact';

const container = document.getElementById('root');
renderReact(
  <StrictMode>
    <App/>
  </StrictMode>,
  container!
);
