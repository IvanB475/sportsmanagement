## Description
For the simplicity, DB is hosted on RDS and the app is hosted on EC2. App can be accessed at http://52.57.101.139:3000/api/ I recommend checking out documentation first at /api to familiarize yourself with APIs available(IMPORTANT NOTE - documentation isn't complete, only users endpoints are fully documented). For testing purposes 2 accounts have been created:

Admin account -> username: AdminDemo, password: admin
User account -> username: UserDemo, password: user

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Current version has no test coverage

Note:
- Comments&rating endpoints are missing
- docker compose is missing

## This is demonstrative app that is not production ready and therefore should not be used in production
## Additions required:
- A lot of edge cases aren't covered in current version (E.G. searching for sport class with ID that doesnt exist in db won't return an error, but instead return an empty response) 
- Validation schemas exist just for demonstration purposes, they do not cover all endpoints and they are very basic
- Error handling is very basic
- Logger should be added
- documentation is incomplete
- Endpoints are basic and serve only to demonstrate functionality
- Migrations& seeded data
- A lot of endpoints should be added for production (e.g. forgot password, reset password, edit user profile and delete account ( for users))
- And more ( some things are listed throughout code commented out as TODO )

