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
    trackParticularClicks,
    trackPurchaseButtonClick,
    trackStep,
    trackHover
} from './custom_trackers/index';
import { SnowplowConfig } from './config/configTypes'

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
    enableGeolocationContext();
    if (config.enableActivityTracking) {
        enableActivityTracking((typeof config.enableActivityTracking === 'boolean') ? {
            minimumVisitLength: 30,
            heartbeatDelay: 10,
        } : config.enableActivityTracking);
    }
    if (config.trackPageView) {
        trackPageView();
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
