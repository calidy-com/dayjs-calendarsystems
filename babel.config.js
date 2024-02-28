module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current' // Transpile for the current version of Node.js
          }
        }]
      ]
    },
    build: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false, // Preserve ES modules
            loose: true
          }
        ]
      ]
    }
  }
}
