import { describe, it, expect } from 'vitest';

import { Type } from '@sinclair/typebox'

import { fake, seed } from '../src/index.js'

describe('should generate object of fake data', () => {
    it('generates valid fake data object of numbers and strings', () => {
        const schema = Type.Object({
            number: Type.Number(),
            string: Type.String(),
        });

        seed(1);

        const data = fake(schema);

        expect(data).toBeInstanceOf(Object);
        expect(data.number).toBeTypeOf('number');
        expect(data.string).toBeTypeOf('string');
    });
})
  