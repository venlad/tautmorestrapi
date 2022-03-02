"use strict";

/**
 *  activity controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::activity.activity");

module.exports = createCoreController(
  "api::activity.activity",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;

      const entity = await strapi.entityService.findMany(
        "api::activity.activity",
        {
          ...query,
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
            grades: {
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
            },
          },
        }
      );
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
