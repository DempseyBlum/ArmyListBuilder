'use strict';

/**
 * wargear service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wargear.wargear');
