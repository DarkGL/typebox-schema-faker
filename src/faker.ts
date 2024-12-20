// https://github.com/soc221b/zod-schema-faker/blob/main/src/faker.ts

import { Faker, faker as _faker } from '@faker-js/faker'
import RandExp from 'randexp'

let _seedValue: number | undefined

// https://github.com/faker-js/faker/issues/448
// TODO: create standalone faker instead of use following workaround
function runFake <Runner extends (faker: Faker) => any>(
  runner: Awaited<ReturnType<Runner>> extends ReturnType<Runner> ? Runner : never,
): ReturnType<Runner> {
  const oldSeedValue = _faker.seed()
  _faker.seed(_seedValue)

  const result = runner(_faker)
  if (result instanceof Promise) {
    throw new SyntaxError('InternalError: runFake cannot be used with async functions')
  }

  _faker.seed(oldSeedValue)

  return result
}

function randexp (pattern: string | RegExp, flags?: string): string {
  const randexp = new RandExp(pattern, flags)
  randexp.randInt = (from, to) => runFake(faker => faker.number.int({ min: from, max: to }))
  return randexp.gen()
}

/**
 * sets the seed to use.
 */
function seed (value?: number): void {
  _seedValue = value
}

export { runFake, randexp, seed }