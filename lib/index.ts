import {
    newTracker,
    trackPageView,
    enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
import trackStep from './custom_trackers/step';
import { SnowplowConfig } from './config/configTypes'

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
    if (config.trackStep) {
        trackStep(collectorAddress, config.trackStep);
    }
}

export { SnowplowConfig };
  