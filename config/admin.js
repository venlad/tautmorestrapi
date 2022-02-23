module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ca3e3b18e87ea2e4ebcaeb0ada3620ba'),
  },
});
