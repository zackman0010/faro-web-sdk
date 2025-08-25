import { TSESLint } from '@typescript-eslint/utils';

describe('eslint', () => {
  const esLint = new TSESLint.ESLint({ cwd: __dirname + '/..' });

  it('prevents faro from being imported from core', () => {
    esLint.lintText("import { faro } from '@grafana/faro-core';", { filePath: 'src/eslint.test.ts' }).then((result) => {
      // @ts-ignore - result[0] will never be undefined here, as lintText will always return an array of size 1
      expect(result[0].messages).toContainEqual(
        expect.objectContaining({
          ruleId: 'no-restricted-imports',
          message:
            "'faro' import from '@grafana/faro-core' is restricted. web-tracing must import faro from web-sdk instead of core",
        })
      );
    });
  });
});
