# Perthshire Gravel
The home of gravel adventures in Highland Perthshire

## Project Setup
This repo (a monorepo) contains 2 projects:
- `./web` - The PerthshireGravel.com website 
  Built with [Eleventy](https://www.11ty.dev/) - a static site generator
- `./studio` - The PerthshireGravel.com Content Management System (CMS)  
  Built with [Sanity](https://www.sanity.io/) - a structured content platform with an open-source CMS built with React

## Local Development
1. Clone this repo
2. Run `npm ci`
3. Run `npm run dev` to start both the website and Sanity Studio locally
4. Open the website at [localhost:8080](http://localhost:8080)
5. Open the CMS dashboard at [locahost:3333](https://localhost:3333)
6. Edit the files in `/web` or `/studio` to edit the website or CMS

### Styling
Styling is done with [Tailwind CSS](https://tailwindcss.com/).

## Deployment
The website and CMS dashboard are hosted on [Netlify](https://www.netlify.com/). 
