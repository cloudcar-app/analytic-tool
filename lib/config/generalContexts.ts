import { createContexts } from "../tools/createContexts";

export const generalContexts = createContexts([
    {
        name: 'concessionaire_context',
        version: '1-0-0',
        data: {
            concessionaire_name: (<HTMLElement>document.querySelector('.cloudcar_button_container')).getAttribute('data-concessionaire-name')
        }
    }
])