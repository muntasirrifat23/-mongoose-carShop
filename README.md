## Car Store B4A2V3

# 1. At first I install al the requirement packages

    1.1 Create a car store project folder
    1.2 run npm init -y
    1.3 Install (express, mongoose, typescript, cors, dotenv, node, validator, eslint, parser, prettier, zod)
    1.4 Check package.json in the devDependencies is th e all packages are installed and checked the version

# 2. Do some setup in the project:

    2.1 In the tsconfig.js uncomment rootdir and outdir
    2.2 In the rootdir set "rootdir": "./src"
    2.3 In the outdir set "rootdir": "./dist"
    2.4 Set a port number
    2.5 Port and database url set in the .env file
    2.6 Before push to the github .env and node_modules file are in .gitignore file

# 3. How to build the project:

    3.1 At file make src folder
    3.2 In the src folder make two folder app and modules
    3.3 In the app folder make config folder
    3.4 index.ts file in the config folder
    3.5 Then we run tsc -init (it convert typescript to javascript)
    3.6 After that for making crud operation of cars and orders we make tw folder cars and orders in the modules folder
    3.7 In the cars folder has car.controller.ts,  car.interface.ts, car.model.ts, car.route.ts, car.services.ts, car.zodvalidation.ts
    3.8 Inside those folder I used crud operation that are post for create new for inside the database,  get for shows all car and also another get for show single car by id, delete for single single car delete from database, put for update a single car data by id
    3.10 car zodvalidation for showing error message and crud operation will be successfully work well with given requirement
    3.11 Then I checked all the cars operation in the postman, is they work perfectly ot not
    3.12 In the orders folder has order.controller.ts, order.interface.ts, order.model.ts, order.route.ts, order.services.ts
    3.13 Inside those folder I used crud operation that are post for create new for inside the database, get for shows all car and also another get for show single car by id, delete for single single car delete from database, put for update a single car data by id and from revenue we can see total orders revenue from price * quantity
    3.14 car zodvalidation for showing error message and crud operation will be successfully work well with given requirement
    3.15 Then I checked all the operation in the postman, is they work perfectly ot not
    3.16 After all the task completed I run 'npm run build' for build the project. If any error occur, the run run build shows error
    3.17 After that I install vercel and deploy the project





