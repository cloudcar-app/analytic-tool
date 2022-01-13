import {
    newTracker,
    trackPageView,
    enableActivityTracking,
} from '@snowplow/browser-tracker';
import { DebuggerPlugin } from '@snowplow/browser-plugin-debugger';
// import trackersConfig from './../../../../snowplow-config.json';

import * as path from 'path';
import * as process from 'process';

var appRoot = require('app-root-path');
var myModule = require(appRoot + '/snowplow-config.json');

console.log(path.dirname(require.main.filename));
const trackersConfig = require(path.join(path.dirname(require.main.filename), 'snowplow-config.json'));
console.log(trackersConfig);
console.log(path.join(path.dirname(require.main.filename), 'snowplow-config.json'));

// import trackPagePingExtended from './custom_tracker/page_ping_extended';

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
}

export default snowplowService;
  