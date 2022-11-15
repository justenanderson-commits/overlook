[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.

# Overlook Hotel - Final Solo Project
## Abstract:
This application is the final solo project for Mod 2. Guests can sign in, see their upcoming and previous bookings, and make a new booking. Booking, room, and customer data are fetched from, and posted to, an API. 

<!-- Insert screenshots/gif here -->

## Installation Instructions:
1. Go to [this repo](https://github.com/justenanderson-commits/overlook) on Github
2. Click Fork > Create New Fork
3. Click Code
4. Copy the SSH url provided by GitHub
5. In the terminal, navigate to the new project repository
6. Type git clone and paste the URL
7. Run `cd overlook`
8. Run `npm install`. Note: Do not run `npm audit fix --force`. This will update to the latest version of packages, which are not wanted. 
9. Run `npm start` to start the program. (`Ctrl + C` will stop it.)
10. In a browser window, navigate to `http://localhost:8080/`.
11. The app should now ready to use.  

## Context:
The team followed a kanban-like workflow using a Trello board and held daily standups. Meetings started by checking in with group mates as humans. Then accomplishments from the day prior were discussed, what needed to be done that day and by whom, and then collaborative debugging help was provided (as needed). Some tasks were completed indivdually, others in pairs, and others as a whole group. The collective estimate is about 100 hours of work time invested over 9 days to create this application's functionality and test suite from scratch using Javascript, html, and css. The Mocha framework and Chai library were used for testing.
For accessability we chose neutral, high-contrast colors (and placed borders around our buttons) to improve the readability for those with some level of visual impairment.

## Contributors:
- [Justen Anderson](https://github.com/justenanderson-commits)

## Learning Goals:
- Implement ES6 classes that communicate to each other as needed
- Use object and array prototype methods to perform data manipulation
- Create a user interface that is easy to use and clearly displays information.
- Write modular, reusable code that follows SRP (Single Responsibility Principle)
- Implement a robust testing suite using TDD
- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application

## Tech Used:
- GitHub
- Terminal
- VS Code
- Chrome Browser/Dev tools
- Zoom
- JavaScript
- Slack
- Mocha
- Chai
- Webpack
- CodePen

## Wins and Challenges
Wins
- The group's willingness to support each member's learning was stellar. Any time there was confusion among one or more group members, the collective group would stop to help everyone understand. Pull request reviews became teachable moments to walk through the code, find opportunities for improvement, and plan next steps.

- The GitHub workflow was very successful. The group collectively made enormous strides in fluency with the GitHub workflow and communication tools. One example was when 2 group members worked on different parts of the same file at the same time. Then their branches were merged after resolving the conflicts. The merge branch was then able to be merged into main. 

- Through our iteration and refactoring, we were able to condense the fetch call into a single function using promiseAll. 

Challenges
- We have our mid-mod exams tomorrow and needed to balance studying for those with working on the project. 

- We put a lot of work into finding a color scheme that was pleasing to the eye and provided enough contrast to be readable. We worked especially hard on the "save" and "remove" buttons.

- This is the first time the four of us have split up work rather than done paired programming. We really learned the git workflow doing it this way and got to resolve many merge conflicts. 

### Additional Notes:
- The site uses Comic Sans to improve readability for users with Dyslexia. 

- UI/UX - Used drop down menus for selecting room types to avoid complications arising from variations in user input.

- BEM naming conventions were used for the html classes and IDs.


