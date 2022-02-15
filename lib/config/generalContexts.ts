import { createContexts } from "../tools/createContexts";

export const generalContexts = createContexts([
    {
        name: 'concessionaire_context',
        version: '1-0-0',
        data: {
            concessionaire_name: (() => {
                const container: HTMLElement | null = document.querySelector('.cloudcar_button_container')
                const title: HTMLElement | null = document.querySelector('title')
                return container ? container.getAttribute('data-concessionaire-name') : (title.innerText || '')
            })()
        }
    }
])