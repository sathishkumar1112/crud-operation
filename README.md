# crud-operation
Technologies used: node js, Express js, mongoDB
Overall Document Description: 

   deployed address : https://wild-red-coral-shoe.cyclic.app/

This document represents an Express.js router module for managing books. It provides a set of RESTful APIs for creating, reading, updating, and deleting book entries. The module also includes request body validation using the express-validator library to ensure data integrity.

API Endpoints:
Create a Book:

Endpoint: POST /create-book
Functionality: This API is used to create a new book entry in the system. It validates the request body to ensure that the title and author are not empty and that the description contains at least 5 words. If the validation passes, a new book entry is added to the database.
Sample Input:
json
Copy code
{
  "title": "Sample Book Title",
  "author": "John Doe",
  "description": "This is a sample book description with more than 5 words."
}
Update a Book:

Endpoint: PUT /update-book/:id
Functionality: This API allows updating the details of an existing book by providing a book ID in the URL. It validates the request body and the provided book ID. If the book exists and is not marked as deleted, it updates the book details.
Sample Input:
json
Copy code
{
  "title": "Updated Title",
  "author": "Jane Smith",
  "description": "An updated book description with more content."
}
Get All Books:

Endpoint: GET /get-all-books
Functionality: This API retrieves all non-deleted books from the database and returns them as a JSON array.

Get a Single Book:

Endpoint: GET /get-book/:id
Functionality: This API allows fetching the details of a specific book by providing the book ID in the URL. If the book is found, it returns the book details.

Delete a Book:

Endpoint: PATCH /delete-book/:id
Functionality: This API marks a book as deleted by setting the "deleted" flag to true. It requires the book ID in the URL and marks the book as deleted in the database.
Sample Input: No input required. Just provide the book ID in the URL.
These APIs provide the basic CRUD operations for managing book data. They include input validation and error handling to ensure data consistency and reliability in the application.
