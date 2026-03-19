export const jwtConstants = {
  secret:
    process.env.JWT_SECRET ||
    'default_secret_key_for_development_purposes_only_change_in_production',
};
