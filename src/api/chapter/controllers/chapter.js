"use strict";

/**
 *  chapter controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::chapter.chapter');

module.exports = createCoreController("api::chapter.chapter", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany("api::chapter.chapter", {
      ...query,
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
        subject: {
          populate: {
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
                subject: true,
              },
            },
          },
        },
        grade: {
          populate: {
            
          },
        },
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
