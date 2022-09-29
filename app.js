/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem, getItems, completeItem } from './fetch-utils.js';
import { renderItem } from './render-utils.js';

/* Get DOM Elements */
const itemForm = document.getElementById('item-form');
const errorDisplay = document.getElementById('error-display');
const itemList = document.getElementById('item-list');
/* State */
let error = null;
let items = [];

/* Events */
//Part B
window.addEventListener('load', async () => {
    const response = await getItems();

    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    } else {
        displayItems();
    }
});
//Create Part A
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(itemForm);
    const newItem = {
        // quantity: formData.get('quantity'),
        quantity: formData.get('quantity'),
        item: formData.get('item'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
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

function displayItems() {
    itemList.innerHTML = '';

    for (const item of items) {
        const itemEl = renderItem(item);
        itemList.append(itemEl);

        itemEl.addEventListener('click', async () => {
            const response = await completeItem(item.id);
            error = response.error;
            const updatedItem = response.data;

            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayItems();
            }
        });
    }
}
