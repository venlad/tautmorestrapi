"use strict";

/**
 *  home controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::home.home");

module.exports = createCoreController("api::home.home", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany("api::home.home", {
      ...query,
      populate: {
        hero: {
          populate: {
            heroImage: true,
            listItems: true,
          },
        },
        ourLearning: {
          populate: {
            activities: {
              populate: {
                image: true,
              },
            },
          },
        },
        numberInfo: {
          populate: {
            image: true,
          },
        },
        sections: {
          populate: {
            heroImage: true,
            listItems: true,
            activities: {
              populate: {
                image: true,
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
