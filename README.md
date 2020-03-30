<h1 align="center">Codechef-Contest-Arena</h1>
<p align="center">
  <strong>Never back down</strong>
</p>

## About
This app was developed to participate in **CodeChef Internship Assessment - Round 2**. The app is designed to simulate Codechef's past contest. Here are the main functionality of app:
- You can login using your Codechef's account(using the CodeChef API OAuth2)
- Once you logged in there is an auto-complete box that will accept a Contest Code or a Contest Name, that will take you to the contest problem page
- Contest page have functionality like:
  - A clickable list of problems
  - Recent activity of users on the contest (submission information)
  - The ranklist for the contest.
  - Timer
- Problem page have functionality like:
  - The Problem Statement
  - Successful submissions information on the problem
  - A Submit Section
 
### How to run the app?
- The application was deployed on a [public url](https://modest-carson-21aa1e.netlify.com/) with the help Netlify's cloud.
- To test the app locally:
  - `git clone https://github.com/saurabhshadow/Codechef-contest-arena.git`
  - Update **config-dev.json**.
  - `cd Codechef-contest-arena`
  - run `npm install`
  - run `npm start`

- **Functions Description**
  - Login with Codechef - You can login using your Codechef's account which uses the CodeChef API OAuth.
  - Choose Contest - You can choose any past contest and submit it to enter.
  - Ranklist - Shows the ranklist of the selected contest.
  - Timer - Contest run for a period of given duration and once the contest gets over it automatically moves to the home page.
  
### Application Screenshots

Login        |  After login
:-------------------------:|:-------------------------:
![left](./img/login.png) | ![right](./img/after_login.png)

Contest Page        |   Problem Page
:-------------------------:|:-------------------------:
![left](./img/contest.png) | ![right](./img/problem.png)

Rank-list             | 
:-------------------------:|
![left](./img/ranklist.png) | 

### Difficulties faced during development
- I was never much introduce to development field(except some basics of DJANGO), so it took 4-5 days in learning the concepts of React, authorization with Oauth2 and working with API. Making Login with CodeChef Credentials (using the CodeChef API OAuth) was one of the difficult part. 

### Public URL of application can be found [here](https://modest-carson-21aa1e.netlify.com/)



<p align="center"> Made with ❤ by <a href="https://github.com/saurabhshadow">Saurabh Yadav</a></p>
