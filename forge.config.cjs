module.exports = {
  packagerConfig: {},

  makers: [
    {
      name: '@electron-forge/maker-rpm',
      config: {
        name: 'ff'
      }
    }
  ]
};
