# Frontend Mentor - Personal finance app solution

This is a solution to the [Personal finance app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See all of the personal finance app data at-a-glance on the overview page
- View all transactions on the transactions page with pagination for every ten transactions
- Search, sort, and filter transactions
- Create, read, update, delete (CRUD) budgets and saving pots
- View the latest three transactions for each budget category created
- View progress towards each pot
- Add money to and withdraw money from pots
- View recurring bills and the status of each for the current month
- Search and sort recurring bills
- Receive validation messages if required form fields aren't completed
- Navigate the whole app and perform all actions using only their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [https://github.com/mrvicthor/personal-finance-app]
- Live Site URL: [https://personal-finance-app-orpin.vercel.app/]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Shadcn Components](https://ui.shadcn.com/) - For beautifully-designed, and accessible components
- [Drizzle-Orm](https://orm.drizzle.team/) - For database management

### What I learned

I learned how to enable push notifications within a nextjs project.

After the upgrade (converting the app to a PWA), I hit a frustrating issue where the build wouldn’t complete. Hours of debugging (shoutout to https://v0.dev/chat) led me to the root cause: the web-push library was being executed in an Edge Runtime environment.

The problem is, web-push depends on https-proxy-agent, which in turn depends on agent-base, and that tries to use Node.js built-in modules like https, which aren’t supported in the Edge Runtime.

The fix was to explicitly configure the route to run on the Node.js runtime instead of the Edge Runtime.

Another reminder of how critical runtime environments are in serverless architectures. Learned a lot from this one.

### Continued development

I will focus on improving my skills and knowledge of unit test and TDD. I am also looking at improving my knowledge of the new react hooks.

### Useful resources

- [https://nextjs.org/docs/app/guides/progressive-web-apps] - This helped me to implement PWA in my nextjs App.

## Author

- Website - [https://t.co/GyuJhbPKuM]
- Frontend Mentor - [@mrvicthor](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@eva_skillz](https://x.com/eva_skillz)
