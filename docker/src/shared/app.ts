import { createSSRApp, Component, createApp } from 'vue'
import { createBundledRouter } from './router'
import { App } from '@vue/runtime-core'
import { Router } from 'vue-router'
import app from '@components/App.vue'
import { createDefaultStore, key } from './store'
import { Store } from 'vuex'
import { createI18n, I18n } from 'vue-i18n'

function createBundledApp(root: Component) {
    const app = (__IS_SERVER__ || (!__IS_DEV__ && __IS_SSR__)) ? createSSRApp(root) : createApp(root);
    const { router, localizedRoutes } = createBundledRouter()
    const store = createDefaultStore(router);
    const i18n = createI18n(
        {
            legacy: false,
            locale: 'de',
            messages: localizedRoutes
        });

    app.use(router);
    app.use(store, key);
    app.use(i18n);

    const out: BundledApp<typeof store, typeof i18n> = {
        app: app,
        router: router,
        store: store,
        i18n
    };
    return out;
}

export interface BundledApp<S extends Store<any>, P extends I18n<any>> {
    app: App<Element>;
    router: Router;
    store: S;
    i18n: P;
}

function createDefaultApp() {
    return createBundledApp(app);
}

export { createBundledApp, createDefaultApp };