export default generateJson;
import { generalContexts } from '../config/generalContexts';
import {
  EventPayload,
  EventData
} from '../config/types';
import { getSnowplowCookie } from './cookieManager';

const addContexts = (
  eventJson: EventPayload,
  generalContexts: unknown[],
  particularContexts: unknown[],
): unknown => {
  if (generalContexts.length + particularContexts.length == 0) { return eventJson }
  const contextsJson: string = JSON.stringify({
    schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
    data: generalContexts.concat(particularContexts)
  })
  eventJson.data![0].co = contextsJson;
  return eventJson;
}

export function generateJson(
  data: unknown,
  schema: string,
  version: string = '1-0-0',
  particularContexts: unknown[] = [],
  event_data?: unknown
): unknown {
  const eventJson = {
    schema: 'iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4',
    data: [
      {
        e: 'ue',
        p: 'web',
        tv: 'node-1.0.2',
        duid: getSnowplowCookie('duid'),
        sid: getSnowplowCookie('sid'),
        ue_pr: JSON.stringify({
          schema: 'iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0',
          data: {
            schema: `iglu:cl.cloudcar/${schema}/jsonschema/${version}`,
            data,
          },
        }),
      },
    ],
  }
  addContexts(eventJson, generalContexts, particularContexts)
  return eventJson;
}
