This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

To get started, install the following software

Node (this project is based on version 15.1.0)

-   https://nodejs.org/en/download

## Building & Running

In the root, you can run the following commands:

-   `npm install` to install dependencies
-   `npm run db` to initial sqlite database, NOTICE: this command only need to Execute once, and generate a study_duck.db under root directory.
-   `npm run dev` to start the project. Website will be accessible at http://localhost:3000/, visit http://localhost:3000/stats for data records.

## Approach to the Problem / Technologies / Hours
The scope of this project is very small, it required two pages, one for public to entering data and one for admin user to check the data, one backend to fetch and insert data, one database to store data. To make it as simply as possible, I created one single web application to handle all of those functionalities. In a perfect world, like production environment, it could be better to separate the customer site and admin site since we might not want to expose the data to public, separated backend so we can keep the service alive while we deploying or making changes on the frontend.

Tech stack I am using:
- Nextjs framework (FE/BE), The main reason I am using this is because it's does not require too many other setting or plugins, by using this I don't have to worry about, for example, set up webpack plugins, create express server, etc.
- Sqlite (Database), to keep it as simple as possible, the required package can be installed from npm directly.
- Typescript, my personally preference, it helps me to use type/interface/classes to keep tract the data types. Also give me an option to configure lint file to improve the code consistency and so on. 

This project took me roughly 10 hours to finish it, majority of the hour has been consumed by styling and frontend changes.