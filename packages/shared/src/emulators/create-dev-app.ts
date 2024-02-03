import { Router } from 'vue-router';
import { Component, createApp, h, VNode } from 'vue';
import { DevWrapper } from '../index';
import servicesPlugin from '../services/services-plugin';

type DevAppOptions = {
    /** Инстанс роутера */
    router?: Router,
    /** Слоты для DevWrapper */
    slots: {
        /** Меню из заголовка (правый верхний слот) */
        header?: VNode | string | Component,
        content: VNode | string | Component,
    },
}

export function createDevApp({ slots, router }: DevAppOptions) {
    const devApp = createApp(h(
        DevWrapper,
        {
            header: slots.header
        }
    ));

    devApp.use(servicesPlugin);

    if (router) {
        devApp.use(router);
    }

    return devApp;
}
