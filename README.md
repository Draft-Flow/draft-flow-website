# Draft & Flow

The website for Draft & Flow

## Project Setup

This repo (a monorepo) contains 2 projects:

- `./web` - The PerthshireGravel.com website
  Built with [Eleventy](https://www.11ty.dev/) - a static site generator
- `./studio` - The PerthshireGravel.com Content Management System (CMS)  
  Built with [Sanity](https://www.sanity.io/) - a structured content platform with an open-source CMS built with React

When installing dependencies, ensure you're in the correct directory - either `/`, `/studio`, or `/web` - based on where the package should be installed.

## Local Development

1. Clone this repo
2. Ensure you're running the required `node` version based on what's in the `.nvmrc` file. Use `nvm` for swapping between `node` versions.
3. Run `npm ci`
4. Copy the `.env.development.template` file to `.env.development` for both the `/studio` and `/web` directories
5. Fill in the necesssary environment variables in both `env.development` files
6. Run `npm run dev` to start both the website and Sanity Studio locally
7. Open the website at [localhost:8888](http://localhost:8888)
8. Open the CMS dashboard at [locahost:3333](https://localhost:3333)
9. Edit the files in `/web` or `/studio` to edit the website or CMS

### Styling

Styling is done with [Tailwind CSS](https://tailwindcss.com/).

## Production Build

Building for production on local is generally not needed as the site is automatically deployed (see below). But sometimes useful if needing to test the production output.

1. Run `npm run build` to build production bundles of the admin and website

## Deployment

Deployment is setup to happen automatically on [Netlify](https://www.netlify.com/) when the `main` branch of the repo is updated.
