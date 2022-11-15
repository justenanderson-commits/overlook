[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.

# Overlook Hotel - Final Solo Project
## Abstract:
This application is the final solo project for Mod 2. Guests can sign in, see their upcoming and previous bookings, and make a new booking. All booking, room, and customer data are fetched from, and posted to, an API. 

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
10. Open a new tab in the terminal and repeat steps 1 - 9 for [this repo](https://github.com/turingschool-examples/overlook-api) (on step 7, you'll need to run `cd overlook-api`)to set up a local server.  
10. In a browser window, navigate to `http://localhost:8080/`.
11. The app should now ready to use.  

## Context:
I followed a kanban-like workflow using the project spec as guide. The estimate is about 40 hours of work time invested over 7 days to create this application's functionality and test suite from scratch using Javascript, html, and css. The Mocha framework and Chai library were used for testing.
For accessability I chose neutral, high-contrast colors (and placed borders around our buttons) and Comic Sans font to improve the readability for those who benefit from those features.

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
- I was very pleased with my ability to complete each of the steps with a fairly high level of comfort. It was just a lot of work.

- Refactoring was actually very fun. There are still areas for improvement, but it's much better than it was. 

- The logic I developed for checking the username and password feels very clean and clever.

Challenges
- Final were assessments on day 3 of the project. So. I dedicated most of my time to studying, which put me behind on the project and made it much more challenging.

- Because of the point above, the styling and user-interface is very basic and, frankly, kind of lame. With more time, I definitely would have added images, animations, a button for the user to return to their dashboard _without_ having to make a booking, less digusting and more descriptive network error messages and improved the overall look and feel.

### Additional Notes:
- UI/UX - Used drop down menus for selecting room types to avoid complications arising from variations in user input.

- BEM naming conventions were used for the html classes and IDs.


