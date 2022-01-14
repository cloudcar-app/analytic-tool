import {
    newTracker,
    trackPageView,
    enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
import trackersConfig from './config.json';

import trackPagePingExtended from './custom_trackers/page_ping_extended';

function snowplowService(collectorAddress: string): void {
    newTracker('cloudcar', collectorAddress, {
        appId: 'cloudcar-snowplow',
        plugins: [DebuggerPlugin()],
        platform: 'web',
        sessionCookieTimeout: 3600,
        contexts: {
        webPage: true,
        },
    });
    if (trackersConfig.enableActivityTracking) {
        enableActivityTracking(trackersConfig.enableActivityTracking);
    }
    if (trackersConfig.trackPageView) {
        trackPageView();
    }
    if (trackersConfig.trackPagePingExtended) {
        trackPagePingExtended(
            trackersConfig.trackPagePingExtended.time_interval, 
            trackersConfig.trackPagePingExtended.mousePosInterval, 
            `${collectorAddress}/com.snowplowanalytics.snowplow/tp2`)
    }
}

export default snowplowService;
  