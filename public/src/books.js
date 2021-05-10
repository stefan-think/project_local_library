//return the author object when given a particular ID
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

//return the book object when given a particular ID
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

//return an array with two arrays: borrowed books and returned books
function partitionBooksByBorrowedStatus(books) {
  const available = books.filter((book) => book.borrows[0].returned);
  const unavailable = books.filter((book) => !book.borrows[0].returned);
  return [unavailable, available];
}

//return an array for a book of all borrowers with their information and return status
//number of borrowers is limited to 10
function getBorrowersForBook(book, accounts) {
  const {borrows} = book;
  const borrowers = borrows.map(({ id, returned })=> {
    const account = accounts.find(account => account.id === id);
    return {...account, returned,};
  });
  return borrowers.slice(0, 10);

}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
