import {
    newTracker,
    trackPageView,
    enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
import trackTextSelection from './custom_trackers/text_selection';
import { SnowplowConfig } from './config/configTypes'
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
    if (config.trackTextSelection) {
        trackTextSelection(config.trackTextSelection)
    }
}

export { SnowplowConfig };