<h1>Electronics eCommerce Shop With Admin Dashboard in Next.js and Node.js</h1>

<p><b>WYN</b> is a <b>free eCommerce store</b> developed using Next.js, Node.js and MongoDB. The application is completely built from scratch(custom design) and completely responsive. The goal of the project is to create a modern web application <b>by following key stages in software engineering</b>. I have created this online shop as part of my Web Dev class in my Graduate program.

<h2>Instructions</h2>
<ol>
  <li><p>To run the app you first need to download and install Node.js and npm on your computer. Here is a link to the tutorial that explains how to install them: <a href="https://www.youtube.com/watch?v=4FAtFwKVhn0" target="_blank">https://www.youtube.com/watch?v=4FAtFwKVhn0</a>. Also here is the link where you can download them: <a href="https://nodejs.org/en" target="_blank">https://nodejs.org/en</a></p></li>
  <li><p>Create a database and cluster to manage data on MongoDB Atlas: <a href="https://www.youtube.com/watch?v=NcN9S0DR1nU" target="_blank">https://www.youtube.com/watch?v=NcN9S0DR1nU</a>. Connect to the database: Connect > Connect to your application > Copy the connection string > Paste it in the .env file.</p></li>
  <li><p>When you install all the programs you need on your computer you need to download the project. When you download the project, you need to extract it.</p></li>
  <li><p>After you extract the project you need to open the project folder in your code editor and in the root create a file with the name .env.</p></li>
  <li><p>You need to put the following code in the .env file and instead of username and password put your MySQL username and password:</p></li>
</ol>

```
DATABASE_URL=mongodb+srv://myuser:mypassword@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
NEXTAUTH_SECRET=12D16C923BA17672F89B18C1DB22A
NEXTAUTH_URL=http://localhost:3000
```

<p>7. After you do it, you need to create another .env file in the server folder and put the same DATABASE_URL you used in the previous .env file:</p>

```
DATABASE_URL=mongodb+srv://myuser:mypassword@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
```

<p>8. Now you need to open your terminal of choice in the root folder of the project and write:</p>

```
npm install
```

<p>9. Now you need to navigate with the terminal in the server folder and install everything:</p>

```
cd server
npm install
```

<p>10. You will need to run the Prisma migration now. Make sure you are in the server folder and write:</p>

```
npx prisma generate
```

<p>11. Next is to insert demo data. To do it you need to go to the server/utills folder and call insertDemoData.js:</p>

```
cd utills
node insertDemoData.js
```

<p>12. Now you can go back to the server folder and run the backend:</p>

```
cd ..
node app.js
```

<p>13. While your backend is running you need to open another terminal(don't stop the backend). In the second terminal, you need to make sure you are in your root project folder and write the following:</p>

```
npx prisma generate
npm run dev
```

<p>14. Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> and see it live!</p>
