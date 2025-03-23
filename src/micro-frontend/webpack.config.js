const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'micro-frontend',

  exposes: {
    './Module': './src/app/app.component.module.ts',
  },

  shared: {
    //...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    "@angular/core": { requiredVersion: 'auto' },
    "@angular/common": { requiredVersion: 'auto' },
    "@angular/common/http": { requiredVersion: 'auto' },
    "@angular/router": { requiredVersion: 'auto' },
  },

});
