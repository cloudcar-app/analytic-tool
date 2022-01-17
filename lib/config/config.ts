import {
    SnowplowConfig
  } from './configTypes';
  
  export const trackersConfig: SnowplowConfig = {
      trackPageView: {},
      enableActivityTracking: {
        minimumVisitLength: 30, 
        heartbeatDelay: 10 
      },
      trackParticularClicks: {
        selectors: [
          "p",
          ".ant-modal-close-x",
          ".ErrorIcon"
        ]
      },
      trackHover: {
        selectors: [
          ".BaseButton_Button__6C7Ri"
        ]
      },
    };