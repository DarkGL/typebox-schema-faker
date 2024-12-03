import { describe, it, expect } from 'vitest';

import { Type } from '@sinclair/typebox'

import { fake, seed } from '../src/index.js'

describe('should generate object of fake data', () => {
    it.only('generates valid fake data object of numbers and strings', () => {
        const schema = Type.Object({
            number: Type.Number(),
            string: Type.String(),
            bool: Type.Boolean(),
            int: Type.Integer(),
            null: Type.Null(),
            literal: Type.Literal('literal'),
        });

        seed(1);

        const data = fake(schema);

        expect(data).toBeInstanceOf(Object);
        expect(data.number).toBeTypeOf('number');
        expect(data.string).toBeTypeOf('string');
        expect(data.bool).toBeTypeOf('boolean');
        expect(data.int).toBeTypeOf('number');
        expect(data.null).toBeNull();
        expect(data.literal).toBe('literal');
    });
})
  