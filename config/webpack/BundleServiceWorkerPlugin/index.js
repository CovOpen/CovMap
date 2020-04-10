const path = require('path')
const buildSW = require('./build-sw')
const { InjectManifest } = require('workbox-webpack-plugin')
const fs = require('fs')

const ID = 'vue-cli:bundle-service-worker-plugin'

module.exports = class BundleServiceWorkerPlugin {
  constructor ({ buildOptions }) {
    this.buildOptions = buildOptions
    this.workboxInject = new InjectManifest(buildOptions.workBoxConfig)
  }

  apply (compiler) {
    compiler.hooks.emit.tapPromise(ID, async (compilation) => {
      if (process.env.VUE_CLI_MODERN_BUILD) {
        // avoid running twice (already run after the legacy build)
        return
      }

      try {
        const { targetDir, swDest, context } = this.buildOptions
        const { fileDependencies, assets, assetsInfo } = await buildSW({
          ...this.buildOptions,
        })
        fileDependencies.forEach((file) => {
          compilation.fileDependencies.add(path.resolve(context, file))
        })
        compilation.assetsInfo = new Map([...compilation.assetsInfo, ...assetsInfo]);
        compilation.assets = { ...compilation.assets, ...assets };

        const buildSWPath = path.resolve(targetDir, swDest)
        const readFile = (_, callback) => fs.readFile(buildSWPath, callback)

        await this.workboxInject.handleEmit(compilation, readFile)
      } catch (ex) {
        console.error(ex)
      }
    })
  }
}
