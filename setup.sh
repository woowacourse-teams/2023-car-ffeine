#!/bin/sh

make
cat SETUP.md >> README.md
rm SETUP.md setup.sh
