import type { TSchema } from '@sinclair/typebox';

import { seed } from './faker.js'

function fake(schema: TSchema) {
    return {};
}

export { fake, seed };
