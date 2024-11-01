# Targomo TypeScript Coding Challenge

Dear candidate,

welcome to the Targomo TypeScript coding challenge. This challenge is both for applicants for a full-stack and front-end position. More on that later.

## The Challenge

At Tagomo, we often deal with location data such as transport lines and combine them with insights form our [APIs](https://www.targomo.com/developers/apis/).

For your challenge, we already put together a simple front-end application that shows the stops of a transit line on a map, together with a sidebar that lets the user select a single stop to see its details. It uses NgRx for state management and there is no backend involved.

The full dataset contains more information than what is currently displayed in the application, it also holds information about the number of people getting on and of at each stop and pre calculated reachability values. You can find the full data in `src/constants/u9.ts`. The dataset consists of 19 stops of the following Model:

| property                  | type    | description                                     |
| ------------------------- | ------- | ----------------------------------------------- |
| `id`                      | string  | id of the stop                                  |
| `name`                    | string  | name of the stop                                |
| `peopleOff`               | integer | number of people getting off at that stop       |
| `peopleOn`                | integer | number of people getting on at that stop        |
| `prevId`                  | string  | id of the previous stop                         |
| `nextId`                  | string  | id of the next stop                             |
| `reachablePopulationWalk` | integer | number of reachable population in 30 min (walk) |
| `reachablePopulationBike` | integer | number of reachable population in 30 min (bike) |
| `lat`                     | float   | latitude coordinate                             |
| `lng`                     | float   | longitude coordinate                            |

We would like you to extend this small web application, which can be enhanced with new features and user interactions.

## Develop

1. clone the repo
2. `npm install`
3. create `.env` file with `MAPTILER_API_KEY={YOUR_PROVIDED_KEY}` variable
4. `npm run serve`

## Backlog

[There is a backlog of Tickets in this repo](https://github.com/targomo/typescript-challenge-frontend/issues). You can see this as an inspiration on what to do. The tickets are labelled with `frontend` and `fullstack` to indicate if we see this as a suitable ticket for front end or full stack candidates.

- **You should not** work on ALL of the tickets. Pick some that you find interesting and focus on them.
- If you have a really good idea on what to do with this app and its not in the backlog, go ahead and do that!

**For full stack applicants we have an additional repo, that adds a small back end service to the project [here](https://github.com/targomo/typescript-challenge-backend).** This repo also has some issues to suggest improvements. For full stack applicants issue [#3](https://github.com/targomo/typescript-challenge-frontend/issues/3) is mandatory.

## Process

To start the challenge just fork this repository (for full stack applicants also the back end repo) and commit your changes to your fork. As soon as you are finished, dont commit to your fork anymore and let us know. We will then review your results and get back to you as soon as possible.

We expect you to work an absolute maximum of six hours on the challenge

## Evaluation

- We will consider the code quality and the number of features delivered (keep in mind that quality is better than quantity)
- The projects are set up to meet our internal style guide (folder structure, best practises, lint etc) please follow the exsisting guidlines (pro tip: use prettier and run `npm run lint` regularly)
- Unit tests are appreciated, but dont get stuck on them
- You will receive our feedback not later than one week after you submit it

## Next steps

After you successfully completed the code challenge we would like to invite you for a meeting in person (or via video call) where we would get to know each other and take the opportunity to discuss your solution in detail.

For questions or further clarification please don't hesitate to contact us.

Sincerely,

Your friends at Targomo

TODO: - share Yup shemas between client and server

- add error reporting

- make a more robust and reusable local storage service

  - use ngrx store local storage util?

- calculate line attribute averages and color-code the values depending on the avg/sd - problem: map stop selection can select two or more lines at once (calculate average across both?)

- deduplicate line rendering (lines are rendereded back and forth for each stop, making them double)

  - improve line generator performance (can we assume line stops are well ordered?)

- add different (line) coloring for each transit line

- add confirm modal for deletion

- add a separate transit stops section to ngrx store

- filter available lines in the dropdown by which is connected to selected stop

- add add new stop location selector on map instead of form

- add reference stop as query parameter to "save" the add form

- add store action for exiting form

- make aside UI components reusable
