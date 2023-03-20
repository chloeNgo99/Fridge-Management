# Fridge Management
## Part 1: Ideation, Design, and Architecture
### Project Proposal:
1. Food waste is a significant problem in households and communities worldwide. Not only does it contribute to environmental degradation and resource depletion, but it also wastes money and a lack of access to healthy food for those in need. To address this issue, I would like to create a web application that manages household refrigerators better and minimize food waste. This web app will allow users to keep track of their food inventory, avoid waste, save money, and create healthy food habits. 

The food management web app should provide users with the following functioning:

    a. Food Item Management: Users can easily add, edit, and remove food items into the database.

    b. Inventory Tracking: The app allows users to check their food inventory by name, expiration date, price, category, or quantity of food items.

    c. Remote Access: Users can view the contents of their fridges from anywhere and at any time.

    d. Inventory Summary: The app summarizes the total number of items in the fridge, expired items, total purchases, number of food categories, and total quantity of each food item.

    e. Recipe Recommendations: The app offers a unique feature that provides recipes based on the food items users already have in their fridges, helping to reduce waste and save money.

2. Wireframe and scenarios:

**Scenario 1:**

Users insert new items into the input field; after clicking the add button, they should be able to view the food card that appears on the screen, and the summary will also update.
<img alt="insert1" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/1.png">

The new added item show up in the third row
<img alt="insert2" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/2.png">

**Scenario 2:**

When users click on a food card, the information about that item will be shown in the input field. If they click the delete, the food card of that item will be deleted from the database, and the summary will also update.

<img alt="delete1" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/5.png">

After clicking the delete button, the item should be removed from the database
<img alt="delete2" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/6.png">

**Scenario 3:**

When users click on a food card, the information about that item will be shown in the input field. They can update the food database by changing any input info, and clicking adds button again. The food card and summary will also be updated. 
<img alt="update" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/3.png">

**Scenario 4:**

When users submit a list of ingredients in the input field, the website will generate a recipe that is close to what users have entered with the recipe name and a list of instructions.
<img alt="update" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/9.png">

After clicking the submit button
<img alt="update" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/8.png">

3. Class Diagram:
<img alt="update" src="https://github.com/chloeNgo99/Fridge-Management/blob/main/Demo%20pics/10.png">

## Part 2: Implementation
### Dependencies that need to be installed:
- Install Node.js
- Npx: npm install -g npm
- firebase: npm install firebase
- React router: npm install react-router-dom
- React Calendar: npm install react-calendar
### Run the program:
Download this package into your computer. Open the project in any IDE (this project originally developed using VSCocde), then navigate to **App.js** file and run the following command, **npm start**, in the terminal.
