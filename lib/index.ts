import {
    newTracker,
    trackPageView,
    enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
import trackParticularClicks from './custom_trackers/particular_clicks';
import { trackersConfig } from './config/config';

declare global {
    interface Window {
      COLLECTOR_ADDRESS: string;
    }
  }

export function enableSnowplow(collectorAddress: string): void {
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
    if (trackersConfig.trackParticularClicks) {
        trackParticularClicks(collectorAddress, trackersConfig.trackParticularClicks)
    }
}
