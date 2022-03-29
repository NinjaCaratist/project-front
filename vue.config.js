const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    css: {
        loaderOptions: {
            sass: {
                sourceMap: true,
                additionalData: '@import "@/assets/styles/global.scss";'
            }
        }
    },
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    }
})
