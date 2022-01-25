export function generateJson(
    data: unknown,
    schema: string,
    version: string = '1-0-0',
    event_data?: unknown
  ): unknown {
    return {
      schema: 'iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4',
      data: [
        {
          e: 'ue',
          p: 'web',
          tv: 'node-1.0.2',
          ue_pr: JSON.stringify({
            schema: 'iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0',
            data: {
              schema: `iglu:cl.cloudcar/${schema}/jsonschema/${version}`,
              data,
            },
          }),
        },
      ],
    };
  }
  
  export default generateJson;