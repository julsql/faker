import type { Options } from 'prettier';
import pluginBabel from 'prettier/plugins/babel';
import pluginEstree from 'prettier/plugins/estree';
import { format } from 'prettier/standalone';

export async function formatResult(result: unknown): Promise<string> {
  return result === undefined
    ? 'undefined'
    : (
        await format(
          `export default ${JSON.stringify(result).replaceAll('\\r', '').replaceAll('<', '&lt;')}`,
          options
        )
      )
        .replace(/^export default /, '')
        .replace(/;\s*$/, '')
        .replaceAll(/\n */g, ' ');
}

const options: Options = {
  singleQuote: true,
  trailingComma: 'none',
  parser: 'babel',
  plugins: [pluginBabel, pluginEstree], // TODO try json5/jsonc
};
