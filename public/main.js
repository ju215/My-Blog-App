const blogTableBody = document.getElementById('blogTableBody');
const createBlogButton = document.getElementById('createBlogButton');

// Function to generate a unique ID for a book
const generateId = () => {
  // Logic to generate a unique ID (e.g., using a counter or UUID library)
  // For simplicity, we'll use a random number between 1 and 10000
  return Math.floor(Math.random() * 10000) + 1;
};

// Function to add a new book
const addBlog = () => {
  const id = generateId();
  const title = prompt('Enter the title of the blog:');
  const author = prompt('Enter the author of the blog:');
  const body = prompt('Enter the body of the blog:');


  // Send a POST request to the server
  fetch('/blogadd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, title, author, body }),
  })
  .then(response => response.json())
  .then(blog => {
    // Add the new book to the table
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const bodyCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    idCell.textContent = blog.id;
    titleCell.textContent = blog.title;
    authorCell.textContent = blog.author;
    bodyCell.textContent = blog.body;
    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(bodyCell);
    row.appendChild(actionCell);

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    blogTableBody.appendChild(row);

    // Event listener for the edit button
    editButton.addEventListener('click', () => editBlog(blog.id));

    // Event listener for the delete button
    deleteButton.addEventListener('click', () => deleteBlog(blog.id));
  })
  .catch(error => console.error('Error:', error));
};

// Function to edit a book
const editBlog = (blogId) => {
  const title = prompt('Enter the new title of the blog:');
  const author = prompt('Enter the new author of the blog:');
  const body = prompt('Enter the new body of the blog:');

  // Send a PUT request to the server
  fetch('/blogedit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: blogId, title, author, body }),
  })
  .then(response => response.json())
  .then(updatedBlog => {
    // Find the table row corresponding to the book and update its data
    const rows = blogTableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      const idCell = rows[i].getElementsByTagName('td')[0];

      if (parseInt(idCell.textContent) === updatedBlog.id) {
        const titleCell = rows[i].getElementsByTagName('td')[1];
        const authorCell = rows[i].getElementsByTagName('td')[2];
        const bodyCell = rows[i].getElementsByTagName('td')[3];

        titleCell.textContent = updatedBlog.title;
        authorCell.textContent = updatedBlog.author;
        bodyCell.textContent = updatedBlog.body;

        break;
      }
    }
  })
  .catch(error => console.error('Error:', error));
};

// Function to delete a book
const deleteBlog = (blogId) => {
  // Send a DELETE request to the server
  fetch('/blogdelete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: blogId }),
  })
  .then(response => {
    if (response.status === 204) {
      // Remove the corresponding table row
      const rows = blogTableBody.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
        if (parseInt(idCell.textContent) === blogId) {
          rows[i].remove();
          break;
        }
      }
    } else {
      console.error('Error:', response.status);
    }
  })
  .catch(error => console.error('Error:', error));
};

// Event listener for the create book button
createBlogButton.addEventListener('click', addBlog);

// Fetch book list from the server
fetch('/bloglist')
  .then(response => response.json())
  .then(data => {
    // Loop through the book list and create table rows
    data.forEach(blog => {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const titleCell = document.createElement('td');
      const authorCell = document.createElement('td');
      const bodyCell = document.createElement('td');
      const actionCell = document.createElement('td');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      idCell.textContent = blog.id;
      titleCell.textContent = blog.title;
      authorCell.textContent = blog.author;
      bodyCell.textContent = blog.body;
      editButton.textContent = 'Edit';
      deleteButton.textContent = 'Delete';

      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(bodyCell);
      row.appendChild(actionCell);

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);

      blogTableBody.appendChild(row);

      // Event listener for the edit button
      editButton.addEventListener('click', () => editBlog(blog.id));

      // Event listener for the delete button
      deleteButton.addEventListener('click', () => deleteBlog(blog.id));
    });
  })
  .catch(error => console.error('Error:', error));