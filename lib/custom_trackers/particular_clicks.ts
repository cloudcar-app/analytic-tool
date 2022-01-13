import { generateJson } from '../tools/generateJson';

const sendEvent = (btnId: string, collector: string) => {
  const eventJson: unknown = generateJson(
    {
      identifier: btnId,
      step_name: '3',
    },
    'particular_clicks_xd'
  );
  fetch(collector, {
    method: 'post',
    body: JSON.stringify(eventJson),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {});
};

const trackParticularClicks = (collector: string): void => {
  const collectorURL = `${collector}/com.snowplowanalytics.snowplow/tp2`;
  let particularButtons: HTMLCollectionOf<Element>;
  document.onreadystatechange = (): void => {
    if (document.readyState === 'complete') {
      particularButtons = window.document.getElementsByTagName('button');
      console.log(particularButtons);
      for (let i = 0; i < particularButtons.length; i += 1) {
        const btn = particularButtons[i];
        btn.addEventListener('click', () => {
          sendEvent(btn.id, collectorURL);
        });
      }
    }
  };
  //   window.addEventListener('load', () => {
  //   });
};

export default trackParticularClicks;
