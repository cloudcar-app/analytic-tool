import {
    newTracker,
    trackPageView,
    enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
import { SnowplowConfig } from './config/configTypes'

import trackHover from './custom_trackers/hover';

declare global {
    interface Window {
      COLLECTOR_ADDRESS: string;
    }
}

export function enableSnowplow(collectorAddress: string, config: SnowplowConfig): void {
    newTracker('cloudcar', collectorAddress, {
        appId: 'cloudcar-snowplow',
        plugins: [DebuggerPlugin()],
        platform: 'web',
        sessionCookieTimeout: 3600,
        contexts: {
        webPage: true,
        },
    });
    if (config.enableActivityTracking) {
        enableActivityTracking(config.enableActivityTracking);
    }
    if (config.trackPageView) {
        trackPageView();
    }
    if(config.trackHover){
        trackHover(config.trackHover);
    }
}

export { SnowplowConfig };
  