# Portfolio

**Hi!** You probably came here from the live version of this code, or you stumbled across it on my GitHub.

This repository contains the code for my portfolio site. Feel free to have a look! If you see any issues or room for improvement, don't hesistate to create an issue!

Because of some future plans with this I have also set up a backend for this at [https://github.com/JonathanBout/Portfolio.Backend](https://github.com/JonathanBout/Portfolio.Backend). Currently, it mostly serves as a gateway to the GitHub GraphQL API, the Gravatar API and the [skillicons.dev](https://skillicons.dev) API, to be able to be able to customize caching and get some nice statistics.

Whenever I create an issue, it's usually because I'm looking for some input as I am not _that_ creative. If you know a solution, please reply to the issue with a comment, or open a PR!

## Building and running the project

- To convert this Vue project into static files, you can run the `npm run build` command. This will build the project and write the output to the dist folder.
- To run the project using Vite's watcher, simply run `npm run dev`. Vite will now build the project (in memory) and serve it on port 3999.
- To start a preview server on the build output (in the dist folder), run `npm run preview`. Vite will just serve the files in dist as static content.
- To run the project with Docker compose, you can simply use `docker compose up --build` or `npm run compose-up`. This will build the frontend and pull the backend. The frontend will run a stripped down Nginx proxy to serve the static files for the frontend. It opens port 50000 for the Dutch site, 50001 for the English site and port 32769 for the backend.
- To run the unit tests, use `npm run test` or `npm test`. This will use vitest to test some helper and utility code.
