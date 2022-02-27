import { InMemoryCache, HttpLink, ApolloClient } from '@apollo/client/core'
import type { ApolloClientOptions, NormalizedCacheObject } from '@apollo/client/core'
import fetch from 'cross-fetch'
import { ApolloClients } from '@vue/apollo-composable'
import type { ApolloClients as SSRApolloClients} from '@vue/apollo-ssr'
import type { App } from 'vue'

function genClients() {
    const http = new HttpLink({ uri: 'http://localhost:4000/api/graphql', fetch, useGETForQueries: true, credentials: 'same-origin' })

    const apolloOptions: ApolloClientOptions<NormalizedCacheObject> = {
        link: http,//authMiddleware.concat(http),
        cache: !__IS_SERVER__
            //@ts-ignore
            ? new InMemoryCache().restore((<Object>window.__APOLLO_STATE__).default)
            : new InMemoryCache(),
        ...(__IS_SERVER__ ? {
            // Set this on the server to optimize queries when SSR
            ssrMode: true,
          } : {
            // This will temporary disable query force-fetching
            ssrForceFetchDelay: 100,
          }),
    }
    
    if (!__IS_SERVER__)
        Array.from(window!.document!.getElementsByTagName('script'))!.find((val)=> {return val.text.startsWith("window.__APOLLO_STATE__")})!.remove()

    let clients: SSRApolloClients = {}
    clients["default"] = new ApolloClient(apolloOptions)

    return clients;
}

export function createGraphql() {
    const clients = genClients();
    return {
        clients,
        install(app: App) 
        {
            //for (const key in clients)
            app.provide(ApolloClients, 
                { 
                    default: clients["default"] 
                });
        }
    }
}