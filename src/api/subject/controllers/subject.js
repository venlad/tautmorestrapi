"use strict";

/**
 *  subject controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::subject.subject');

module.exports = createCoreController("api::subject.subject", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany("api::subject.subject", {
      ...query,
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
        activity: {
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
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
