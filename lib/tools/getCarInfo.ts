export function getCarInfo(buttonContainer: HTMLElement): object {
    return {
        carName: (() => {
            return (<HTMLElement>buttonContainer.querySelector('[class*=\'Widget_Title\']')).innerText
        })(),
        year: (() => {
            const yearString: string = (<HTMLElement>buttonContainer.querySelector('[class*=\'Widget_Subtitle\']'))
                .innerText
                .split(' ')[1]
                .trim()
            return parseInt(yearString)
        })(),
        version: (() => {
            return (<HTMLElement>buttonContainer.querySelector('[class*=\'Widget_ActiveButton\'] span')).innerText 
        })(),
        colorName: (() => {
            return (<HTMLElement>buttonContainer.querySelector('[class*=\'Widget_ColorName\']')).innerText
        })()
    };
}