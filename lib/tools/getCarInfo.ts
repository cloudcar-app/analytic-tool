export function getCarInfo(buttonContainer: HTMLElement): object {
  return {
    carName: (() => {
      return (<HTMLElement>(
        buttonContainer.querySelector("[class*='Widget_Title']")
      )).innerText;
    })(),
    year: (() => {
      const yearString: string = (<HTMLElement>(
        buttonContainer.querySelector("[class*='Widget_Subtitle']")
      )).innerText
        .split(' ')[1]
        .trim();
      return parseInt(yearString, 10);
    })(),
    version: (() => {
      let selectedVersion = <HTMLElement>(
        buttonContainer.querySelector("[class*='Widget_VersionButton']")
      );
      if (!selectedVersion) {
        selectedVersion = <HTMLElement>(
          buttonContainer.querySelector('.ant-select')
        );
      }
      return selectedVersion.innerText;
    })(),
    colorName: (() => {
      return (<HTMLElement>(
        buttonContainer.querySelector("[class*='Widget_ColorName']")
      )).innerText;
    })(),
  };
}
  