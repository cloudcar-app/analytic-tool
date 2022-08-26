import { createContexts } from "../tools/createContexts";

export const generalContexts = createContexts([
    {
        name: 'concessionaire_context',
        version: '1-0-0',
        data: {
            concessionaire_name: (() => {
                const container: HTMLElement | null = (
                  window.top || window
                ).document.querySelector('.cloudcar_button_container');
                return container ? container.getAttribute('data-concessionaire-name') : ''
            })()
        }
    }
])