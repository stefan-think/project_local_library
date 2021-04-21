function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let availableBooks = [];
  let unavailableBooks = [];
  const bookStatus = [];
  books.forEach(book => {
    let borrowedBook = book.borrows;
    if (borrowedBook.find(borrow => borrow.returned === false)) {
      unavailableBooks.push(borrowedBook);
    } else {
      availableBooks.push(borrowedBook);
    }
  });
  bookStatus.push(unavailableBooks, availableBooks);
  return bookStatus;
}

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
