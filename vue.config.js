/**
 * @author João R. Santos <up201809187@fe.up.pt>
 */

module.exports = {
    lintOnSave: true,
    devServer: {
        disableHostCheck: true
    },
    productionSourceMap: false,
    pwa: {
        name: 'hotapp',
        themeColor: '#81ecec',
        msTileColor: '#2d3436',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/service-worker.js',
            // ...other Workbox options...
        }
    }
};
