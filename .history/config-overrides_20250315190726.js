module.exports = function override(config) {
    config.resolve.fallback = {
      zlib: false,
      querystring: false,
      path: false,
      crypto: false,
      fs: false,
      stream: false,
      http: false,
      net: false,
    };
    return config;
  };