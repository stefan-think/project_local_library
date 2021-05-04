const lib = require("./books");

//Return the total number of books in the array
function getTotalBooksCount(books) {
  return books.length;
}

//Return the total number of accounts in the array
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/*Return the total number of books that are currently borrowed.
By using the helper function, partitionBooksByBorrowedStatus().
This function returns array containing 2 arrays. Array with index 0 contains books that have not been returned.
*/
function getBooksBorrowedCount(books) {
  const booksBorrowed = lib.partitionBooksByBorrowedStatus(books);
  return booksBorrowed[0].length;
}

//Return an ordered list of most common genres
function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const commonGenres = [];
  bookGenres.map((genre) => {
    const genreIndex = commonGenres.findIndex((commonGenre) => commonGenre.name === genre);
    if (genreIndex >= 0) {
      commonGenres[genreIndex].count += 1;
    } else {
      commonGenres.push({ name: genre, count: 1 });
    }
  });
  commonGenres.sort((genreA, genreB) => genreB.count - genreA.count);
  if (commonGenres.length > 5) {
    return commonGenres.slice(0, 5);
  }
  return commonGenres;

}

//Return an ordered list of most popular books. Limited to top 5 books.
function getMostPopularBooks(books) {
  const popularBooks = [];
  books.forEach((book) => {
      let borrowedBook = book.borrows;
      popularBooks.push({ name: book.title, count: borrowedBook.length  });
  });
  popularBooks.sort((titelA, titleB) => titleB.count - titelA.count);
  if (popularBooks.length > 5) {
    return popularBooks.slice(0, 5);
  }
  return popularBooks;
}

function getBooksByAuthorsId(books){
  const popularBooksByAuthorId = [];
  books.forEach((book) => {
      let authorId = book.authorId;
      let bookBorrows = book.borrows;
      popularBooksByAuthorId.push({ id: authorId, borrows: bookBorrows.length });
  });
  return popularBooksByAuthorId;
}


// Retrun the list of top five popular authors
function getMostPopularAuthors(books, authors) {
    let count = 0;
  const idTotals = books.reduce((acc, { authorId, borrows }) => {
    acc[authorId]
      ? (count = acc[authorId].count + borrows.length)
      : (count = borrows.length);
    acc[authorId] = { name: authorId, count };
    return acc;
  }, []);

  const idTotalsSorted = Object.values(idTotals)
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);

  return idTotalsSorted.map((idTotal) => {
    const findId = idTotal.name;
    const name = lib.findAuthorById(authors, findId).name;
    return { ...idTotal, name: `${name.first} ${name.last}` };
  });
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
