# Profile Page will not be accessed without Login/Register

You can use below link to know how to create this app

https://available-soon

**If you face any error after doing below steps, then please update current version of your installed NodeJS software.**

## Start Code (Base Code)

Repository Number: T13

## Versions Detail

### Version 0 (v0)

- Passord is not encrypted before entering into database; Registration Page.

### Version 1 (v1)

- Password is encrypted for both Login and Register pages

### Version 2 (v2)

- Best than v1
- Logout link exists in both Profile-page and Navbar

### Version 3 (v3)

- **Problem in v2:** database connection and collection's name are required in each file.
- Models are used in this version, to remove v2-prolem.

### Version 4 (v4)

- **Problem in v3:** Token doesn't contain **userType**. But it should contain for future usage. This will be necessary in case of multiple users.
- The above probles is solve in this version, by using **userType** in the token. This will be used in
  `Login/page.ts`
  `Navbar/page.ts`

## How to Run:

- Open folder for any version
- Open this folder with VS Code
- Open VS code terminal and type command

      npm install

- Above command will install all neccessary packages and create node_modules folder in your downloaded code.

- Now run below command to run this app

      npm run dev

- env.local file is necessary. Rename env.txt file as .env.local

- Import database into MongoDB Compass:

      1. Open MongoDB Compass.
      2. Create new database named as "team_manager_db" and collection name as "register_user". These names are defined in src/app/api/register/route.ts
      3. Database name is also used in .env.local file
      4. If you want to add our created-data, then you can follow below instructions.
            a. Before proceed instructions, it is noted that if you already created data, then unique ID may be duplicated with our Data-IDs. Therefore, be carefull otherwise database-error may rise.
            Create database and collection as mentioned above.
            b. Navigate to the database and click on "Add Data" > "Import File"
            c. Select the team_manager_db.register_user.json file and import it into the appropriate collection
