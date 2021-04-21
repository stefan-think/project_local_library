function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => accountId === borrow.id && total++));
  return total;
}
 

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];
  books.forEach(book => {
    let borrowedBook = book.borrows;
    //try to use filter instead if
    if (borrowedBook.find(borrow => borrow.id === account.id && borrow.returned === false)) {
      booksPossessed.push(book);
    }
  })
  
  booksPossessed.forEach(book=>{
    let author = authors.find(person => person.id === book.authorId);
    book['author'] = author;
  })
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
