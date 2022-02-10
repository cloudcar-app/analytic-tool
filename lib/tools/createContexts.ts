export type Context = {
    name: string,
    version: string,
    data: object,
}

export function createContexts(contexts: Context[]) {
    contexts.forEach((element: Context, index: number, contextsArray: unknown[]) => {
        contextsArray[index] = {
            schema: `iglu:cl.cloudcar/${element.name}/jsonschema/${element.version}`,
            data: element.data
        }
    })
    return contexts
}