'use strict';

/**
 *  footer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::footer.footer');

module.exports = createCoreController("api::footer.footer", ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
  
      const entity = await strapi.entityService.findMany("api::footer.footer", {
        ...query,
        populate: {
            logo:true,
          navItems: true,
          socialLinks:{
              populate:{
                  icon: true,
              }
          }
        },
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(sanitizedEntity);
    },
  }));
  
