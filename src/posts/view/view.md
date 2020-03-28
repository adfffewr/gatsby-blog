---
title: MD
date: '2020-05-20'
---

# Hi!

```
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const server = express();

const firebase = admin
  .initializeApp(
    {
      credential: admin.credential.cert(
        require('../.firebase/service-account.json')
      ),
      databaseURL: 'https://your-name-here.firebaseio.com'
    },
    'server'
  )
  .firestore();

server.use(cors());
server.use(bodyParser.json());
server.use((req, _res, next) => {
  req.firebaseServer = firebase;
  next();
});

module.exports = server;
```

## Topics Covered

1. Gatsby
2. GraphQL
3. React
