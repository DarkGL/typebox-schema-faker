import { describe, it, expect } from 'vitest';

import { Type } from '@sinclair/typebox'

import { fake } from '../src/index.js'

describe('should generate array of fake data', () => {
    const schema = Type.Object({
        number: Type.Number(),
        string: Type.String(),
    })

    const data = fake(schema)

    expect(data).toBeInstanceOf(Object)
    expect(data.number).toBeInstanceOf(Number)
    expect(data.string).toBeInstanceOf(String)
})
  