'use strict';

/**
 * about-parent service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::about-parent.about-parent');
