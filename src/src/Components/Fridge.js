import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";

function Fridge(props) {
  const [value, onChange] = useState(new Date());

  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, "item");
  const [updated, setUpdated] = useState(false);

  //write
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newQuantity, setNewQuantity] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [newExpDate, setNewExpDate] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  //add new input into database
  const addItem = async () => {
    await addDoc(itemsCollectionRef, {
      name: newName,
      price: newPrice,
      quantity: newQuantity,
      category: newCategory,
      expDate: newExpDate,
    });

    //reset input field and update sumary
    fetchItems();
    setNewName(""); // clear the name input field
    setNewPrice(0); // clear the price input field
    setNewQuantity(0); // clear the quantity input field
    setNewCategory(""); // clear the category input field
    setNewExpDate("");
    setUpdated(!updated); // update the state variable to trigger re-render
  };

  //update
  const [currentSelectedItemID, setCurrentSelectedItemID] = useState(null);

  const handleItemClick = (item) => {
    setNewName(item.name);
    setNewPrice(item.price);
    setNewQuantity(item.quantity);
    setNewCategory(item.category);
    setCurrentSelectedItemID(item.id);
    setNewExpDate(item.expDate);
  };

  const updateItem = async () => {
    const itemUpdate = doc(db, "item", currentSelectedItemID);
    const updatedItem = {
      name: newName,
      price: newPrice,
      quantity: newQuantity,
      category: newCategory,
      expDate: newExpDate,
    };
    await setDoc(itemUpdate, updatedItem, { merge: true });
    const updatedItems = items.map((item) =>
      item.id === currentSelectedItemID ? { ...item, ...updatedItem } : item
    );

    //reset input field and update sumary
    fetchItems();
    setItems(updatedItems);
    setNewName("");
    setNewPrice("");
    setNewQuantity("");
    setNewCategory("");
    setNewExpDate("");
  };

  //delete
  const deleteItem = async () => {
    const delItem = doc(db, "item", currentSelectedItemID);
    await deleteDoc(delItem);
    //console.log(currentSelectedItemID);

    // Remove the item from the items array
    const updatedItems = items.filter(
      (item) => item.id !== currentSelectedItemID
    );
    setItems(updatedItems);

    // Reset the currentSelectedItemID and clear out the input field
    setCurrentSelectedItemID(null);
    fetchItems();
    setNewName(""); // clear the name input field
    setNewPrice(0); // clear the price input field
    setNewQuantity(0); // clear the quantity input field
    setNewCategory(""); // clear the category input field
    setNewExpDate("");
    setUpdated(!updated); // update the state variable to trigger re-render
  };

  //read
  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getItems();
  }, [updated]);

  //reflect the summary
  // state variables for the summary labels
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalExpItems, setTotalExpItems] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // fetch all items from Firestore
  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "item"));
    const items = [];
    let totalQuantity = 0;
    let totalPayment = 0;
    let categories = new Set();
    let expiredItems = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = {
        id: doc.id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
        expDate: data.expDate,
      };
      console.log("expiryDate:", item.expDate);
      console.log("expiryDate as Date object:", new Date(item.expDate));
      totalQuantity += parseInt(data.quantity);
      totalPayment += parseInt(data.quantity) * parseFloat(data.price);
      categories.add(data.category);
      if (new Date(item.expDate) < new Date()) {
        expiredItems += 1;
      }
      items.push(item);
    });

    setItems(items);
    setTotalItems(items.length);
    setTotalQuantity(totalQuantity);
    setTotalCategory(categories.size);
    setTotalExpItems(expiredItems);
    setTotalPayment(totalPayment.toFixed(2));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const itemsToDisplay = items.slice(startIdx, endIdx);

  return (
    <div
      className="fridgeContainer"
      style={{ backgroundImage: "url(./images/fridgeContainer5.png)" }}
    >
      <Navbar />
      <div className="fridgeGrid">
        <div className="leftGrid">
          <div className="inputBox">
            <h2>Food Item</h2>
            <form>
              <div className="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  // name="newName"
                  // value = {newItem.newName}
                  // onChange = {inputHandler}
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                  value={newName}
                />
              </div>

              <div className="form-group">
                <label for="price">Price:</label>
                $
                <input
                  type="text"
                  id="price"
                  // name="newPrice"
                  // value = {newItem.newPrice}
                  // onChange = {inputHandler}
                  onChange={(event) => {
                    setNewPrice(event.target.value);
                  }}
                  value={newPrice}
                />
              </div>

              <div className="form-group">
                <label for="quantity">Quantity</label>
                #
                <input
                  type="quantity"
                  id="quantity"
                  // name="newQuantity"
                  // value={newItem.newQuantity}
                  // onChange = {inputHandler}
                  onChange={(event) => {
                    setNewQuantity(event.target.value);
                  }}
                  value={newQuantity}
                />
              </div>

              <div className="form-group">
                <label for="exp">Exp Date:</label>
                <input
                  type="date"
                  id="epx"
                  name="epx"
                  value={newExpDate}
                  onChange={(e) => setNewExpDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="category">Category:</label>
                <select
                  id="category"
                  name="newCategory"
                  // value={newItem.newCategory}
                  // onChange={inputHandler}
                  onChange={(event) => {
                    setNewCategory(event.target.value);
                  }}
                  value={newCategory}
                >
                  <option></option>
                  <option value="fruit">Fruit</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="grain">Grain</option>
                  <option value="frozen">Frozen product</option>
                </select>
              </div>
            </form>
            <div className="circle-button">
              <button type="submit" className="addButton" onClick={addItem}>
                Add
              </button>
              <button className="updateButton" onClick={updateItem}>
                Update
              </button>
              <button className="deleteButton" onClick={deleteItem}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="middleGrid">
          <div className="middleContainer">
            <h2> My Fridge</h2>
            {itemsToDisplay.map((item) => (
              <div
                className={`displayItem ${new Date(item.expDate) < new Date() ? 'expired' : ''}`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <p>Name: {item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: #{item.quantity}</p>
                <p>Category: {item.category}</p>
              </div>
            ))}
          </div>
          <div className="pageBtn">
            <button onClick={handleClickPrev} disabled={currentPage === 1}>
              {"<"}
            </button>
            <div>{currentPage}/{Math.ceil(items.length / itemsPerPage)} </div>
            <button onClick={handleClickNext} disabled={endIdx >= items.length}>
              {">"}
            </button>
          </div>
        </div>
        <div className="rightGrid">
          <div className="summary">
            <h2>Summary</h2>

            <div className="summaryGroup">
              <label>Total Items: </label>
              <label>{totalItems}</label>
            </div>

            <div className="summaryGroup">
              <label>Total Quantity: </label>
              <label>{totalQuantity}</label>
            </div>

            <div className="summaryGroup">
              <label>Total Category: </label>
              <label>{totalCategory}</label>
            </div>

            <div className="summaryGroup">
              <label>Total Exp items: </label>
              <label>{totalExpItems}</label>
            </div>

            <div className="summaryGroup">
              <label>Total Payment: </label>
              <label>{totalPayment}</label>
            </div>
          </div>
          <div className="calendar">
            <div>
              <Calendar className="cal" onChange={onChange} value={value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fridge;
