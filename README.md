# README

Joe Elert's transaction API for Fetch Rewards Backend Software Engineering

* Node.js version v18.7.0

* Dependencies:
    - Node.js
    - Express (to install with npm run `npm install express`)
    - Request (`npm install request`)

* To Run:
    - Match Node version 
    - run `node app.js`
    - Server is now listening to 4 routes described below

* Routes:
- **/**: 
    - Basic home route
    - Returns what routes server is listening too
- **/spend**: 
    - Accepts a post request with the content formatted as `{points: int}` where int is the number of points to spend
    - Returns the spend per payer
- **/transaction**: 
    - Accepts a post request with the content formatted as 
    ```
    {
        payer: string, 
        points: int, 
        timestamp: timestamp
    }
    ```
    - returns nothing 
- **/points**: 
    - Accepts a get request
    - Returns the current user points

* Testing:
Given test case is modeled in reqests.js. To run: `node requests.js`