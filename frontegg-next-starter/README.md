This is a demo project for [Frontegg](https://frontegg.com) built with Next.JS

## Getting Started

First, install:

```bash
npm install
# or
yarn install
```

Under `_app.js` replace the subdomain to match your Frontegg subdomain

```javascript
const options = {
  baseUrl: 'https://[YOUR-SUBDOMAIN].frontegg.com',
  requestCredentials: 'include'
};
```

Then, run the project

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can go to the login dialog at `http://localhost:3000/account/login`

In order to get the logged in user, use the following hook:

```javascript
const { user } = useAuth();
```
