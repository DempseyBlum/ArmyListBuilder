'use strict';

/**
 * core-keyword service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::core-keyword.core-keyword');
