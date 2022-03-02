"use strict";

/**
 *  grade controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::grade.grade');

module.exports = createCoreController("api::grade.grade", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany("api::grade.grade", {
      ...query,
      populate: {
        activities: {
          populate: {
            icon: true,
            subjects: {
              populate: {
                icon: true,
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
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
