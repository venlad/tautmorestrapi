'use strict';

/**
 *  about-parent controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about-parent.about-parent');

module.exports = createCoreController("api::about-parent.about-parent", ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
  
      const entity = await strapi.entityService.findMany("api::about-parent.about-parent", {
        ...query,
        populate: {
          banner: {
            populate: {
              heroImage: true,
              listItems: true,
            },
          },
         sections: {
             populate:{
                 image: true,
             }
         },
         testimonials: {
            populate:{
                image: true,
            }
        },
        benefitsSection: {
            populate: {
              activities: {
                populate: {
                  image: true,
                },
              },
            },
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