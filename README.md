# loopback-ts-to-json-schema

Proof-of-Concept using [typescript-json-schema](https://www.npmjs.com/package/typescript-json-schema)
to generate JSON Schema for TypeScript classes

## Current Issues/Limitations
- The JSON schema objects can't reference top-level entries
  - This might be due to the way we assemble them in LoopBack 4
- Private member functions on the Entity are being added to the JSON schema
objects
  - Would require comment-blocks on the Entity class to mark them as private
  for the parser

[![LoopBack](http://loopback.io/images/overview/powered-by-LB-xs.png)](http://loopback.io/)
