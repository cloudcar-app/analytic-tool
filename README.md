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

Este tracker es propio de _Snowplow_ y corresponde al evento de abrir una página. Este evento captura el URL, referrer y título de la página. Este no necesita una configuración por lo que para ser implementado o no basta con incluir un booleano en la configuración de _Snowplow_.
```
trackPageView: true
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

Este es un tracker personalizado de CloudCar y envía eventos al collector cada vez que el usuario hace click en algún elemento HTML de interés para la organización. Su configuración requiere de una lista de selectores correspondientes a los elementos HTML que se quieren trackear, junto con un identificador para reconocerlos más adelante en la base de datos.

```
trackParticularClicks: {
    selectors: [
      {
        selector_id: 'color 1',
        css_selector: 'div.ant-row:nth-child(4) div:nth-child(1)',
      },
      {
        selector_id: 'color 2',
        css_selector: 'div.ant-row:nth-child(4) div:nth-child(2)',
      },
    ],
  }
```

#### trackPurchaseButtonClick

Este es otro tracker personalizado de CloudCar y envía eventos al collector cada vez que el usuario hace click en el botón de compra. Su configuración requiere de una lista de selectores correspondientes al botón de compra. El evento que se envía consiste de un identificador del vehículo a comprar y el tiempo que se demora el usuario en hacer click en el botón desde que entró a la página.

```
trackPurchaseButtonClick: {
    selectors: [
        "#botonComprar"
    ]
}
```

#### trackTextSelection

Este es un tracker personalizado de CloudCar y envía eventos al collector cada vez que el usuario selecciona texto. Su configuración solo requiere de un booleano para definir si se implementa o no. El evento que se envía contiene el texto seleccionado, la posicion del texto en la pantalla y si el usuario copió ese texto o no.

```
trackTextSelection: true
```

#### trackHover

Este es un tracker personalizado de CloudCar y envía eventos al collector cada vez que el usuario hace hover sobre un elemento HTML dentro de la página. Su configuración requiere de una lista de selectores correspondientes al los distintos elementos HTML que se quieren trackear. El evento que se envía consiste de un identificador del vehículo observavodo, un identificador del elemento, el innerText del elemento si es que tiene y el tiempo que el usuario hace hover sobre este.
        
```
trackHover: {
    selectors: [
        {
            selector_id: 'Purcharse Button',
            css_selector: '.BaseButton_Button',
        },
        {
            selector_id: 'Car Image',
            css_selector: '.Widget_ImageHeader',
        },
    ],
}
```

#### trackStep

Este es un tracker personalizado de CloudCar y envía eventos al collector cada vez que el usuario se cambia de step, ya sea a través del botón continuar o un botón step. Su configuración requiere de una lista de selectores correspondientes al los distintos elementos HTML que se quieren trackear. El evento que se envía consiste en el nombre step donde estuvo el usuario, el tiempo que permaneció en el step y un identificador del la compra (purchaseIntentId).
        
```
trackStep: {
    selectors: [
        {
            selector_id: 'Next Button',
            css_selector: '.ant-btn.NextButton_NextButton__uJhUk.DefaultButton.PrimaryBaseButton',
        },
        {
            selector_id: 'Step Button',
            css_selector: '.ant-row.ant-row-middle.VerticalStepContainer.ClickableStep',
        },
    ],
}
```

#### trackPagePingExtended

Este es un tracker personalizado de CloudCar y envía eventos al collector cada `time_interval` cantidad de segundos. Este envia información acerca del estado actual del usuario en la página (blur o focus) y la posición del mouse cada `mousePosInterval` segundos.

```
trackPagePingExtended: {
    time_interval: 30,
    mousePosInterval: 2
}
```