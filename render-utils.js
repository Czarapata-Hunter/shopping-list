export function renderItem(item) {
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = item.description;
    li.append(p);

    return li;
}
