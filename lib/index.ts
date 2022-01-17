import {
	newTracker,
	trackPageView,
	enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
import { trackersConfig } from './config/config';
import trackTextSelection from './custom_trackers/text_selection';

declare global {
interface Window {
		COLLECTOR_ADDRESS: string;
}
}

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
	if (trackersConfig.trackTextSelection) {
			trackTextSelection(trackersConfig.trackTextSelection)
	}
}

export default snowplowService;