//Return the account object when given a particular ID
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

//Return the list of accounts ordered by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

//Return the number of times an account has created a 'borrow' record
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => accountId === borrow.id && total++));
  return total;
}

//Return all of the books taken out by an account with the author embedded
function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];
  books.forEach(book => {
    let borrowedBook = book.borrows;
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
