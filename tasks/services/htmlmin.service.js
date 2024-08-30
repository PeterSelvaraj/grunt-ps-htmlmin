'use strict';

const fs = require('fs');
const path = require('path');
const log = require('grunt-ps-log');

class HtmlMinService {
  #fsp;
  #terser;

  constructor(_fsp, _terser) {
    this.#fsp = _fsp;
    this.#terser = _terser;
  }

  async #minify(data, options) {
    log.verbose('Options: ' + JSON.stringify(options, null, 2));
    return await this.#terser.minify(data, options);
  }

  async minifyFile(filePath, destPath, options) {
    try {
      log.verbose(`Reading file: ${filePath}`);
      const data = await this.#fsp.readFile(filePath, 'utf8');

      log.verbose('Minifying HTML...');
      const result = await this.#minify(data, options);

      const dir = path.dirname(destPath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      log.verbose(`Writing minified HTML to: ${destPath}`);
      await this.#fsp.writeFile(destPath, result);
    } catch (err) {
      log.fail(`Error minifying file ${filePath}:`, err);
    }
  }
}

module.exports = (a, b) => new HtmlMinService(a, b);
