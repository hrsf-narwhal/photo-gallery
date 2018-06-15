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

Create a Share Credentials file for AWS:
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html

Create a `.env` file with environment variables for accessing your database. See `.env.default` for the template.

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
