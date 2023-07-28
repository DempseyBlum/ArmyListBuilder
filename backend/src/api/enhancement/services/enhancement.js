'use strict';

/**
 * enhancement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::enhancement.enhancement');
