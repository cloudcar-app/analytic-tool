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
      trackStep: {
        selectors: [
          ".ant-row.ant-row-middle.VerticalStepContainer.ClickableStep",
          ".ant-btn.NextButton_NextButton__uJhUk.DefaultButton.PrimaryBaseButton"
        ]
      },
    };