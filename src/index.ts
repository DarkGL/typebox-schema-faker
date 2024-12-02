import type { TSchema } from '@sinclair/typebox';
import { Kind } from '@sinclair/typebox';

import { seed, runFake } from './faker.js'

function fake(schema: TSchema) {
    return generate(schema);
}

function generate(schema: TSchema) {
    if(schema[Kind] === 'String') {
        return runFake(faker => faker.lorem.word());
    }
    else if(schema[Kind] === 'Number') {
        return runFake(faker => faker.number.float({ min: 0, max: 100 }));
    }
    else if(schema[Kind] === 'Boolean') {
        return runFake(faker => faker.datatype.boolean());
    }
    else if(schema[Kind] === 'Array') {
        const result: any[] = [];

        let amount = schema.minItems ?? 1;
        
        for(let i = 0; i < amount; i++) {
            result.push(generate(schema.items as TSchema));
        }

        return result;
    }
    else if(schema[Kind] === 'Object') {
        const result: Record<string, any> = {};
        for(const [key, value] of Object.entries(schema.properties)) {
            result[key] = generate(value as TSchema);
        }
        return result;
    }
    else if (schema[Kind] === 'Any') {
        return runFake(faker => faker.number.int());
    }
    else if (schema[Kind] === 'Unknown') {
        return runFake(faker => faker.number.int());
    }
    else if (schema[Kind] === 'Integer') {
        return runFake(faker => faker.number.int());
    }
}

export { fake, seed };
