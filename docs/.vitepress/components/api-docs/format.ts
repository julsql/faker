import type { Options } from 'prettier';
import pluginBabel from 'prettier/plugins/babel';
import pluginEstree from 'prettier/plugins/estree';
import { format } from 'prettier/standalone';

export async function formatResult(result: unknown): Promise<string> {
  return result === undefined
    ? 'undefined'
    : (
        await format(
          JSON.stringify(result).replaceAll('\\r', '').replaceAll('<', '&lt;'),
          options
        )
      ).replaceAll(/\n */g, ' ');
}

const options: Options = {
  singleQuote: true,
  trailingComma: 'none',
  parser: 'json5',
  plugins: [pluginBabel, pluginEstree],
};
