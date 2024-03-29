import {
    newTracker,
    trackPageView,
    enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
import { 
    GeolocationPlugin, 
    enableGeolocationContext 
} from '@snowplow/browser-plugin-geolocation';
import {
    trackTextSelection,
    trackPagePingExtended,
    trackParticularClicks,
    trackPurchaseButtonClick,
    trackStep,
    trackHover
} from './custom_trackers/index';
import { SnowplowConfig } from './config/configTypes';
import { getCookieByName } from './tools/cookieManager';
import { setUserMailCookie  } from './tools/setUserMailCookie ';
import { findParentBySelector } from './tools/findParentBySelector';

export function enableSnowplow(collectorAddress: string, config: SnowplowConfig): void {
    newTracker('cloudcar', collectorAddress, {
        appId: 'cloudcar-snowplow',
        plugins: [DebuggerPlugin(), GeolocationPlugin()],
        platform: 'web',
        sessionCookieTimeout: 3600, // in seconds
        contexts: {
          webPage: true,
        },
    });

    setUserMailCookie ();
    
    if (config.enableLocationTracking) {
        enableGeolocationContext();
    }
    
    if (config.enableActivityTracking) {
        enableActivityTracking((typeof config.enableActivityTracking === 'boolean') ? {
            minimumVisitLength: 30,
            heartbeatDelay: 10,
        } : config.enableActivityTracking);
    }
    if (config.trackPageView) {
        trackPageView({
            context: [
                {
                    schema: 'iglu:cl.cloudcar/email_context/jsonschema/2-0-0',
                    data: {
                    email: getCookieByName('userMail') || ''
                    }
                },
                {
                    schema: 'iglu:cl.cloudcar/concessionaire_context/jsonschema/1-0-0',
                    data: {
                        concessionaire_name: (() => {
                            const container: HTMLElement | null = (
                              window.top || window
                            ).document.querySelector(
                              '.cloudcar_button_container',
                            );
                            return container ? container.getAttribute('data-concessionaire-name') : ''
                        })()
                    }
                },
            ],
        });
    }
    if (config.trackPagePingExtended) {
        trackPagePingExtended(collectorAddress, config.trackPagePingExtended)
    }
    if (config.trackStep) {
        trackStep(collectorAddress, config.trackStep);
    }
    if(config.trackHover){
        trackHover(collectorAddress, config.trackHover);
    }
    if (config.trackTextSelection) {
        trackTextSelection(collectorAddress);
    }
    if (config.trackPurchaseButtonClick) {
        trackPurchaseButtonClick(collectorAddress, config.trackPurchaseButtonClick);
    }
    if (config.trackParticularClicks) {
        trackParticularClicks(collectorAddress, config.trackParticularClicks);
    }
}

export { SnowplowConfig };
