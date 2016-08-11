#!/bin/bash
for file in $(ls _*.js); do
  uglifyjs ${file} -m -o ${file:1}
done
