# Perthshire Gravel
The home of gravel adventures in Highland Perthshire

## Project Setup
This repo (a monorepo) contains 2 projects:
- `./web` - The PerthshireGravel.com website 
  Built with [Eleventy](https://www.11ty.dev/) - a static site generator
- `./studio` - The PerthshireGravel.com Content Management System (CMS)  
  Built with [Sanity](https://www.sanity.io/) - a structured content platform with an open-source CMS built with React

When installing dependencies, ensure you're in the correct directory - either `/`, `/studio`, or `/web` - based on where the package should be installed. 

## Local Development
1. Clone this repo
2. Run `npm ci`
3. Run `npm run dev` to start both the website and Sanity Studio locally
4. Open the website at [localhost:8080](http://localhost:8080)
5. Open the CMS dashboard at [locahost:3333](https://localhost:3333)
6. Edit the files in `/web` or `/studio` to edit the website or CMS

### Styling
Styling is done with [Tailwind CSS](https://tailwindcss.com/).

## Production Build
Building for production on local is generally not needed as the site is automatically deployed (see below). But sometimes useful if needing to test the production output.
1. Run `npm run build` to build production bundles of the admin and website

## Deployment
Deployment is setup to happen automatically on [Netlify](https://www.netlify.com/) when the `main` branch of the repo is updated.
