module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: "bionix",
          api_key: "217857124333514",
          api_secret: "3j7PHs2RGdYWDPYvDx6uGtPVRwI",
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    // ...
  });
  