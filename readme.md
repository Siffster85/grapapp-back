# North West Wrestling

## What is North West Wrestling

NW Wrestling is a website for tracking wrestling events in the North West. The North West Wrestling scene has multiple fans who travel to and as a community attend shows together. 

Currently this is just a proof of concept, where admins can create events and see who is attending and users can attend events and add them to their calendar. They can view the events they are attending and cancel their attendance as required. The Admins can also delete any and all accounts.

I've spoken with several promotions in the area who were interested in a more clear way to track their attendees and understand if there was more data available for who buys tickets for each show, relying to 3rd party sites like Skiddle and EventBrite has been a bone of contention for some promoters. I would continue to develop this app with a payment tie in, the most common in use is GoCardless, building on the attend function to bring in the payment function.

Some of the promotions also have a membership element where they pre-purchase a membership and get discounts or have an allotment of ticket credits. I would use the Roles variable to controla nd expand on this as well.

### Testing instructions
Test Accounts:

Test Member Account:
email: testuser@test.test
pw: !Test123

Test Admin Account
email: testadmin@test.test
pw: !Admin123

The Frontend is hosted here:
https://nwwrestling.netlify.app

The Repo is here:
https://github.com/Siffster85/grapapp-front

The Backend is hosted on Vercel:
https://vercel.com/siffster85s-projects/grapapp-backend

The Repo is here:
https://github.com/Siffster85/grapapp-back

You can register new accounts via accessing the page, should you wish to create a new Admin account you can do this here:
https://nwwrestling.netlify.app/register-admin

If you want to test this app locally you will need to download both repos, create a Skiddle API key and a MongoDB account for testing. In the frontend repo, you will need to navigate here: ./frontend/src/api/axiosInstance.ts and change `process.env.REACT_APP_BACKEND_BASE_URL` to `process.env.REACT_APP_BACKEND_LOCAL_URL`

You'll need your own Skiddle API key which can be requested here: https://www.skiddle.com/api/join.php

Create a .env in your root and in there you'll need:
REACT_APP_SKIDDLE_API_KEY = <YOUR API KEY>

REACT_APP_BACKEND_LOCAL_URL = 'http://localhost:8000'

In the backend repo you will need to navigate here: ./backend/api/index.ts and change the cors origin to `https://localhost:3000` or whichever port you use for the front end.

Once you have your MongoDB setup, add your mongodb server which should look like:
`mongodb+srv://<USERNAME>:<PASSWORD>@<YOURACCOUNT>.mongodb.net/?retryWrites=true&w=majority&appName=<YOURAPPNAME>`

Create a .env in your root and in there you'll need:
PORT=8000
JWT_SECRET=<A simple string like '1234zxcv'>
NODE_ENV=development
MONGODB_URI=<Your MongoDB link>

Run `npm install` and then run `npm start` on both repos and you should be able to test locally.

You will need to register a user account and admin if you test locally.

#### Tech Stack
- TypeScript
- React
- Reduxjs/Toolkit
- MongoDB
- Json Webtoken