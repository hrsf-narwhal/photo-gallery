# Itsy Photo Component

A photo viewer for Itsy, our clone of Etsy's product pages.

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MySQL

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Setup

Run MySQL, create a database and user.

In the repo, create a /config folder, containing the following.

```sh
config
  aws.js
  database.js
```

The `database.js` should contain your database credentials, in the format:

**database.js**  
```js
module.exports = {
  user: 'username', 
  password: 'password',
  database: 'database_name'
};
```

And `aws.js` should contain your AWS credentials, in the format:

**aws.js**  
```js
{
  "accessKeyId": "theKey", 
  "secretAccessKey": "theSecretKey", 
  "region": "us-west-1"
}
```

Seed the database by running the following from the repo:

```sh
mysql -u username -p password < database/schema.sql
node database/seed.js
```

To run the server:

```sh
node server/index.js
```

And the component lives on port 3001.
