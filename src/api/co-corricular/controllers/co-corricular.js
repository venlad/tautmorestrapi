'use strict';

/**
 *  co-corricular controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::co-corricular.co-corricular');

module.exports = createCoreController("api::co-corricular.co-corricular", ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
  
      const entity = await strapi.entityService.findMany("api::co-corricular.co-corricular", {
        ...query,
        populate: {
          icon: true,
          chapters: {
            populate: {
              topic: {
                populate: {
                  subTopic: {
                    populate:{
                      section: true,
                  videoAndMedia: true
                    }
                  },
                },
              },
              grade: true,
              subject: true
            },
          },
          activity: {
            populate: {
              subjects: {
                populate: {
                  icon: true,
                  chapters: {
                    populate: {
                      topic: {
                        populate: {
                          subTopic: {
                            populate:{
                              section: true,
                  videoAndMedia: true
                            }
                          },
                        },
                      },
                      grade: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(sanitizedEntity);
    },
  }));
  