import template from './sw-advanced-selection-property-group-option.html.twig';

const { Component } = Shopware;

/**
 * @private
 * @description Configures the advanced selection in entity selects.
 * Should only be used as a parameter `advanced-selection-component="sw-advanced-selection-property-group-option"`
 * to `sw-entity-...-select` components.
 * @status prototype
 */
Component.register('sw-advanced-selection-property-group-option', {
    template,

    computed: {
        propertyContext() {
            return { ...Shopware.Context.api, inheritance: true };
        },

        propertyColumns() {
            return [
                {
                    property: 'name',
                    label: this.$tc('sw-property.list.columnOptions'),
                    allowResize: true,
                    primary: true,
                },
                {
                    property: 'group.name',
                    label: this.$tc('sw-property.list.columnName'),
                    allowResize: true,
                },
            ];
        },

        propertyFilters() {
            return {
                'group-filter': {
                    property: 'group',
                    label: this.$tc('sw-property.list.columnName'),
                    placeholder: this.$tc('sw-property.general.placeholderSearchBar'),
                },
            };
        },

        propertyAssociations() {
            return [
                'group',
            ];
        },
    },
});
