/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem } from './fetch-utils.js';

/* Get DOM Elements */
const itemForm = document.getElementById('item-form');
const errorDisplay = document.getElementById('error-display');
/* State */
let error = null;
let items = [];

/* Events */

//Create Part A
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(itemForm);
    const newItem = {
        // quantity: formData.get('quantity'),
        item: formData.get('item'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        itemForm.reset();
    }
});
/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
