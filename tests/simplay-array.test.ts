import { describe, it, expect } from 'vitest';

import { Type } from '@sinclair/typebox'

import { fake } from '../src/index.js'

describe('should generate array of fake data', () => {
    const schema = Type.Array(Type.Number())

    const data = fake(schema)

    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBe(1)
    expect(data[0]).toBeInstanceOf(Number)
})
  