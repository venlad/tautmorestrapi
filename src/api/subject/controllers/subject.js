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
