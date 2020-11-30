#!/bin/sh
cd ~/projects/WhatIWanna/public
yarn sass &
cd ~/projects/WhatIWanna/server
nodemon server.js 
