import { describe, it, expect } from 'vitest';

import { Type } from '@sinclair/typebox'

import { fake, seed } from '../src/index.js'

describe('should generate object of fake data', () => {
    it('generates valid fake data object of unknown', () => {
        const schema = Type.Object({
            any: Type.Unknown(),
        });

        seed(1);

        const data = fake(schema);

        expect(data).toBeInstanceOf(Object);
        expect(data.any).toBeTypeOf('number');
    })
})
  