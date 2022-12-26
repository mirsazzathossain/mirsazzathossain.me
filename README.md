[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mirsazzathossain/mirsazzathossain.me)

## mirsazzathossain.me

This is the source code for my personal website. I have used the following technologies to build this website.

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Icons: [Heroicons](https://heroicons.com/)
- Content: [Markdown](https://www.markdownguide.org/)
- Content Management: [Contentlayer](https://www.contentlayer.dev/)
- Deployment: [Vercel](https://vercel.com/)

## Overview

- `app/*`: I have used next.js new `app` directory structure. This directory contains the main app.
- `components/*`: All custom components are stored in this directory.
- `content/*`: This directory contains all the content of the website. I have used [Contentlayer](https://contentlayer.dev/) to manage the content.
- `pages/*`: All API routes of the website are stored in this directory.
- `public/*`: This directory contains all the static assets of the website.
- `styles/*`: I have used Tailwind CSS for styling. This directory contains the Tailwind CSS global styles and some custom styles for the website.
- `utils/*`: This directory contains some utility functions.

## Cloning and Forking

If you want to clone or fork this repository, please make sure to remove the `content` and `public` directories as they contain my personal content and assets. You can add your own content and assets in the `content` and `public` directories respectively.

Clone the repository by running the following command.

```bash
git clone https://github.com/mirsazzathossain/mirsazzathossain.me.git
# or
git clone git@github.com:mirsazzathossain/mirsazzathossain.me.git
```

You can remove the `content` and `public` directories by running the following commands.

```bash
rm -rf content
rm -rf public
```

Add your own content and assets in the `content` and `public` directories respectively.

## Installation

Install the dependencies by running the following command.

```bash
npm install
# or
yarn install
```

Finally, run the following command to start the development server.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Note**: You have to create a `.env` file in the root directory and add the following environment variables to get the Spotify integration working.

```bash
SPOTIFY_CLIENT_ID=yourspotifyclientid
SPOTIFY_CLIENT_SECRET=yourspotifyclientsecret
SPOTIFY_REFRESH_TOKEN=yourspotifyrefreshtoken
```

You can get the `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` from [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/). You can get the `SPOTIFY_REFRESH_TOKEN` from [Spotify Web API Console](https://developer.spotify.com/console/get-recently-played/).

## Inspiration

I have used the following websites as inspiration for building this website.

- [Delba - delba.dev](https://delba.dev/)
- [Lee Robinson - leerob.io](https://leerob.io/)
- [Manu Arora - manuarora.in](https://manuarora.in/)
- [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)

The styles of the website are inspired by the [Spotlight](https://spotlight.tailwindui.com/) theme design by [Tailwind UI](https://tailwindui.com/).
