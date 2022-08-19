# Better Blogs Client

The frontend for Better Blogs, a reddit-like sharing platform for blog posts. Built to learn modern full stack development.

## Tech Stack

- [React](https://github.com/facebook/react) for the User Interface
  - [Create React App](https://github.com/facebook/create-react-app) for project structure
  - [React Hook Form](https://react-hook-form.com/) for form handling
  - [React Redux](https://github.com/reduxjs/react-redux) via [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) for state management
- [ESLint](https://github.com/eslint/eslint) for linting
- [Prettier](https://github.com/prettier/prettier) for formatting

## Usage

### Setup

Set `REACT_APP_BACKEND_URL` environment variable to the backend URL via the shell or a `.env` file.

### Linting

Run `npm run lint` to check for linting errors and `npm run lint:fix` to format code to spec.

### Development

Run `npm run dev` to start in development mode at [http://localhost:3000/](http://localhost:3000/).

### Deployment

Build the project with `npm run build` and run with `npm start`.
