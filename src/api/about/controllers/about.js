'use strict';

/**
 *  about controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about.about');


module.exports = createCoreController("api::about.about", ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
  
      const entity = await strapi.entityService.findMany("api::about.about", {
        ...query,
        populate: {
          banner: {
            populate: {
              heroImage: true,
              listItems: true,
            },
          },
         whyCards: {
             populate:{
                 listItems: true,
             }
         },
         tautMoreFeatures:{
             populate:{
                 heroImage: true,
                 listItems: true,
             }
         },
         works:{
             populate:{
                 listItems: true,
             }
         },
         carousel:{
             populate:{
                 carouselcard:{
                     populate:{
                         image: true
                     }
                 }
             }
         },
         FAQ: true
        },
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(sanitizedEntity);
    },
  }));
  
