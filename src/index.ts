import type { TSchema } from '@sinclair/typebox';

import { seed, runFake } from './faker.js'

function fake(schema: TSchema) {
    return generate(schema);
}

function generate(schema: TSchema) {
    if(schema.type === 'string') {
        return runFake(faker => faker.lorem.word());
    }
    else if(schema.type === 'number') {
        return runFake(faker => faker.number.float({ min: 0, max: 100 }));
    }
    else if(schema.type === 'boolean') {
        return runFake(faker => faker.datatype.boolean());
    }
    else if(schema.type === 'array') {
        const result: any[] = [];

        let amount = schema.minItems ?? 1;
        
        for(let i = 0; i < amount; i++) {
            result.push(generate(schema.items as TSchema));
        }

        return result;
    }
    else if(schema.type === 'object') {
        const result: Record<string, any> = {};
        for(const [key, value] of Object.entries(schema.properties)) {
            result[key] = generate(value as TSchema);
        }
        return result;
    }
}

export { fake, seed };
