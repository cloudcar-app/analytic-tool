# CloudCar Analytic-Tool

Esta es una librería npm desarrollada por CloudCar para el tracking customizado de eventos. La librería es una personalización de las funcionalidades ya ofrecidas por Snowplow y permite la obtención de datos correspondiente al comportamiento del usuario con CloudCar.
## Install

```bash
npm i @cloudcar/analytic-tool
```

## Usage

Para habilitar la librería en tu proyecto de node es necesario llamar a la función `enableSnowplow`. Esta recibe dos argumentos: un _string_ representando el URL al _collector_ de _Snowplow_ y un objecto correspondiente a la configuración de la librería.

#### Configuration

La configuración se encarga de ajustar el uso de _Snowplow_ a las preferencias del proyecto. La configuración es un objeto de tipo `SnowplowConfig` con las configuraciones de cada tracker (también objetos). Si la configuración para un tracker está, entonces esta se implementará en la app. Si el tracker no recibe configuración basta con entregar un objeto vacío y será implementado. Un ejemplo de configuración es la que se ve a continuación:
```
import { SnowplowConfig } from '@cloudcar-app/analytic-tool';

const trackersConfig: SnowplowConfig = {
    trackPageView: {},
    enableActivityTracking: {
      minimumVisitLength: 30, 
      heartbeatDelay: 10 
    }
  };
  
export default trackersConfig;
```
La configuración es finalmente exportada para ser utilizada en el index con el _collector_ para llamar a `enableSnowplow`. Esto se ve de la siguiente forma:

```
import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/scss/index.scss';
import App from 'App';
// Inicio de implementación librería
import { enableSnowplow } from '@cloudcar-app/analytic-tool';
import trackersConfig from './snowplow_config';

const COLLECTOR_ADDRESS: string = process.env.REACT_APP_COLLECTOR_ADDRESS ?? '';

enableSnowplow(COLLECTOR_ADDRESS, trackersConfig);
// Fin implementación libería
ReactDOM.render(<App />, document.getElementById('root'));
```

## Trackers

Por defecto, todos los eventos de _Snowplow_ tienen información mínima que todos contienen independiente del evento. Esta corresponde a información del usuario como su IP, browser desde el cual se conecta, tiempo del evento, etc. Para capturar información más específica correspondiente a cierto comportamiento en particular del usuario con la página, se necesitan diferentes trackers. Por el momento, la librería ofrece los siguientes trackers.

#### trackPageView

Este tracker es propio de _Snowplow_ y corresponde al evento de abrir una página. Este evento captura el URL, referrer y título de la página. Este no necesita una configuración por lo que para ser implementado basta con incluir un objeto vacío en la configuración de _Snowplow_.
```
trackPageView: {}
```

#### enableActivityTracking

Este tracker también es propio de _Snowplow_ y captura informacion que permite ver cuánto interactúa el usuario con la página (máximo scroll, si la tab está en focus, si el mouse se ha movido, etc). Cada cierta cantidad de tiempo se captura el estado actual de la interacción del usuario con la página y se envía esta información al collector. A estas capturas de interacción se les llama _page pings_. La configuración de este evento consiste de `heartbeatDelay`, que indica cada cuánto tiempo se envía un _page ping_, y `minimumVisitLength` que muestra cuánto tiempo después de que cargue la página es necesario que se envía el primer _page ping_. 
```
enableActivityTracking: {
    minimumVisitLength: 30, 
    heartbeatDelay: 10 
}
```

#### trackParticularClicks

Este es un tracker personalizado de CloudCar y envía eventos al collector cada vez que el usuario hace click en algún elemento HTML de interés para la organización. Su configuración requiere de una lista de selectores correspondientes a los elementos HTML que se quieren trackear.

```
trackParticularClicks: {
    selectors: [
        "div.VerticalStepContainer:nth-child(1)",
        "#botonComprar",
        "img"
    ]
}
```