export type EnableActivityTracking = {
    minimumVisitLength: number;
    heartbeatDelay: number;
}

export type Selector = {
    selector_id: string,
    css_selector: string,
    step?: string,
}

export type SnowplowConfig = {
    /**
     * Este tracker es propio de _Snowplow_ y corresponde al evento 
     * de abrir una página. Este evento captura el URL, referrer y 
     * título de la página. Este no necesita una configuración por 
     * lo que para ser implementado o no basta con incluir un booleano 
     * en la configuración de _Snowplow_.
     * ```
     trackPageView: true
     ```
     */
    trackPageView?: boolean;
    /**
     * Este tracker también es propio de _Snowplow_ y captura 
     * informacion que permite ver cuánto interactúa el usuario 
     * con la página (máximo scroll, si la tab está en focus, si 
     * el mouse se ha movido, etc). Cada cierta cantidad de tiempo 
     * se captura el estado actual de la interacción del usuario con 
     * la página y se envía esta información al collector. A estas 
     * capturas de interacción se les llama _page pings_. La 
     * configuración de este evento consiste de `heartbeatDelay`, 
     * que indica cada cuánto tiempo se envía un _page ping_, y 
     * `minimumVisitLength` que muestra cuánto tiempo después de que
     * cargue la página es necesario que se envía el primer _page ping_.
     * ```
     enableActivityTracking: {
         minimumVisitLength: 30, 
         heartbeatDelay: 10 
        }
        ``` 
        */
       enableActivityTracking: EnableActivityTracking | boolean;
       /**
        * Este es un tracker personalizado de CloudCar y envía eventos 
        * al collector cada vez que el usuario hace click en algún elemento 
        * HTML de interés para la organización. Su configuración requiere de 
        * una lista de selectores correspondientes a los elementos HTML que 
        * se quieren trackear, junto con un identificador para reconocerlos 
        * más adelante en la base de datos.
    
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
        */
       trackParticularClicks?: TrackParticularClicks;
       /**
        * Este es otro tracker personalizado de CloudCar y envía eventos 
        * al collector cada vez que el usuario hace click en el botón de 
        * compra. Su configuración requiere de una lista de selectores 
        * correspondientes al botón de compra. El evento que se envía 
        * consiste de un identificador del vehículo a comprar y el tiempo 
        * que se demora el usuario en hacer click en el botón desde que 
     * entró a la página.
        
        ```
        trackPurchaseButtonClick: {
            selectors: [
                "#botonComprar"
            ]
        }
        ```
        */
       trackPurchaseButtonClick?: TrackPurchaseButtonClick;
    /**
     * Este es un tracker personalizado de CloudCar y envía eventos al 
     * collector cada vez que el usuario selecciona texto. Su configuración 
     * solo requiere de un booleano para definir si se implementa o no. El 
     * evento que se envía contiene el texto seleccionado, la posicion del 
     * texto en la pantalla y si el usuario copió ese texto o no.

        ```
        trackTextSelection: true
        ```
     */
    trackTextSelection?: boolean;
    /**
    * Este es otro tracker personalizado de CloudCar y envía eventos 
    * al collector cada vez que el usuario hace hover sobre un elemento 
    * html dentro de la página. 
    * Su configuración requiere de una lista de selectores 
    * correspondientes al los distintos elementos HTML que 
    * se quieren trackear. El evento que se envía 
    * consiste de un identificador del vehículo observavodo, un identificador del elemento,
    * el innerText del elemento si es que tiene y el tiempo que el usuario hace hover
    * sobre este.
    
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
    */
    trackHover?: TrackHover;
     /**
     * Este es un tracker personalizado de CloudCar y envía eventos al collector cada vez que el usuario se cambia de step, 
     * ya sea a través del botón continuar o un botón step. 
     * Su configuración requiere de una lista de selectores correspondientes al los distintos elementos HTML que se quieren trackear.
     *  El evento que se envía consiste en el step donde estuvo el usuario, el tiempo que permaneció en el step,
     *  un identificador del elemento, el innerText del elemento si es que tiene y el tiempo que el usuario hace hover sobre este.
        
       ```
       trackStep: {
           selectors: [
               {
                   selector_id: 'Next Button',
                   css_selector: '.BaseButton_Button',
               },
               {
                   selector_id: 'Step Button',
                   css_selector: '.Widget_ImageHeader',
               },
           ],
       }
       ```
     */
    trackStep?: TrackStep;
}

export type TrackedElement = {
    id: string;
    element: HTMLElement;
    step: string;
}

export type TrackHover = {
    selectors?: (Selector)[];
}

export type TrackParticularClicks = {
    selectors: (Selector)[];
}

export type TrackPurchaseButtonClick = {
    selectors: (string)[];
}

export type TrackStep = {
    selectors?: (Selector)[];
}