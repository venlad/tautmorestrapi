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
        subject: {
          populate: {
            chapters: {
              populate: {
                topic: {
                  populate: {
                    subTopic: true,
                  },
                },
                grade: true,
              },
            },
          },
        },
        grade: {
          populate: {
            activities: {
              populate: {
                subjects: {
                  populate: {
                    chapters: {
                      populate: {
                        topic: {
                          populate: {
                            subTopic: true,
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
        },
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
