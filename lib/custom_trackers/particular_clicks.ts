import { generateJson } from '../tools/generateJson';
import { TrackParticularClicks } from '../config/configTypes';

const sendEvent = (ev: Event) => {
  // TODO: Cambiar schema de particular clicks para hacerlo más universal
  const eventJson: unknown = generateJson(
    {
      identifier: (ev.target instanceof Element) ? ev.target.id : '',
      step_name: 'none',
    },
    'particular_clicks'
  );
  fetch(`${window.COLLECTOR_ADDRESS}/com.snowplowanalytics.snowplow/tp2`, {
    method: (() => { 
      console.log('fetch');
      return 'post'
    })(),
    body: JSON.stringify(eventJson),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {});
};

const trackParticularClicks = (collector: string, config: TrackParticularClicks): void => {
  let particularButtons: NodeListOf<Element>;
  const selectors: string = config.selectors.join(', ');
  setInterval(() => {
    particularButtons = window.document.querySelectorAll(selectors);
    for (let i = 0; i < particularButtons.length; i += 1) {
      const btn = particularButtons[i];
      btn.addEventListener('click', sendEvent);
    }
  }, 5000)
  //   window.addEventListener('load', () => {
  //   });
};

export default trackParticularClicks;
