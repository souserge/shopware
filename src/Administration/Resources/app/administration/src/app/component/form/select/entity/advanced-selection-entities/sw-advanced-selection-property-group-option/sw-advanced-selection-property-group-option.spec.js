import { createLocalVue, shallowMount } from '@vue/test-utils';
import 'src/app/component/form/select/entity/sw-entity-advanced-selection-modal';
import 'src/app/component/form/select/entity/advanced-selection-entities/sw-advanced-selection-property-group-option';
import 'src/app/component/base/sw-modal';
import 'src/app/component/base/sw-card';
import 'src/app/component/base/sw-card-filter';
import 'src/app/component/data-grid/sw-data-grid';
import 'src/app/component/data-grid/sw-data-grid-settings';
import 'src/app/component/entity/sw-entity-listing';
import 'src/app/component/context-menu/sw-context-button';
import 'src/app/component/context-menu/sw-context-menu-item';
import 'src/app/component/base/sw-button';
import 'src/app/component/grid/sw-pagination';
import 'src/app/component/base/sw-empty-state';
import 'src/app/component/structure/sw-page';
import { searchRankingPoint } from 'src/app/service/search-ranking.service';

async function createWrapper() {
    const localVue = createLocalVue();

    return {
        wrapper: shallowMount(await Shopware.Component.build('sw-advanced-selection-property-group-option'), {
            localVue,
            provide: {
                acl: {
                    can: () => true,
                },
                filterFactory: {
                    create: () => [],
                },
                filterService: {
                    getStoredCriteria: () => {
                        return Promise.resolve([]);
                    },
                    mergeWithStoredFilters: (storeKey, criteria) => criteria,
                },
                shortcutService: {
                    startEventListener() {},
                    stopEventListener() {},
                },
                numberRangeService: {},
                repositoryFactory: {
                    create: (name) => {
                        return { search: () => Promise.resolve([]) };
                    }
                },
                searchRankingService: {
                    getSearchFieldsByEntity: () => {
                        return Promise.resolve({
                            name: searchRankingPoint.HIGH_SEARCH_RANKING
                        });
                    },
                    buildSearchQueriesForEntity: (searchFields, term, criteria) => {
                        return criteria;
                    },
                },
            },
            stubs: {
                'sw-entity-advanced-selection-modal': await Shopware.Component.build('sw-entity-advanced-selection-modal'),
                'sw-entity-listing': await Shopware.Component.build('sw-entity-listing'),
                'sw-modal': await Shopware.Component.build('sw-modal'),
                'sw-card': await Shopware.Component.build('sw-card'),
                'sw-card-filter': await Shopware.Component.build('sw-card-filter'),
                'sw-simple-search-field': {
                    template: '<div></div>',
                },
                'sw-context-button': {
                    template: '<div></div>',
                },
                'sw-context-menu-item': {
                    template: '<div></div>',
                },
                'sw-data-grid-settings': {
                    template: '<div></div>',
                },
                'sw-empty-state': {
                    template: '<div class="sw-empty-state"></div>',
                },
                'sw-pagination': {
                    template: '<div></div>',
                },
                'sw-icon': {
                    template: '<div></div>',
                },
                'router-link': true,
                'sw-button': {
                    template: '<div></div>',
                },
                'sw-sidebar': {
                    template: '<div></div>',
                },
                'sw-sidebar-item': {
                    template: '<div></div>',
                },
                'sw-language-switch': {
                    template: '<div></div>',
                },
                'sw-notification-center': {
                    template: '<div></div>',
                },
                'sw-search-bar': {
                    template: '<div></div>',
                },
                'sw-loader': {
                    template: '<div></div>',
                },
                'sw-data-grid-skeleton': {
                    template: '<div class="sw-data-grid-skeleton"></div>',
                },
                'sw-checkbox-field': {
                    template: '<div></div>',
                },
                'sw-media-preview-v2': {
                    template: '<div></div>',
                },
                'sw-color-badge': {
                    template: '<div></div>',
                },
                'sw-extension-component-section': {
                    template: '<div></div>',
                },
                'sw-ignore-class': {
                    template: '<div></div>',
                },
            },
        }),
    };
}

describe('components/sw-advanced-selection-property-group-option', () => {
    let wrapper;
    let selectionModal;

    beforeEach(async () => {
        const data = await createWrapper();
        wrapper = data.wrapper;
        selectionModal = wrapper.findComponent({ name: 'sw-entity-advanced-selection-modal' });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should be a Vue.JS component that wraps the selection modal component', async () => {
        expect(wrapper.vm).toBeTruthy();
        expect(selectionModal.exists()).toBe(true);
        expect(selectionModal.vm).toBeTruthy();
    });
});
