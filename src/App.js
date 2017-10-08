import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksGrid from './BooksGrid'
import SearchResults from './SearchResults'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query, 20).then((searchResults) =>{
      if (searchResults) {
        this.setState({ searchResults })
      }
    })
  }

  findShelf(bookFromResults) {
    for (let book of this.state.books) {
      if (bookFromResults.id === book.id) {
        return book.shelf;
      }
    }
    return 'none';
  }

  updateShelf(book, event) {
    let newShelf = event.target.value
    BooksAPI.update(book, newShelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BooksGrid booksToShow={this.state.books.filter((book) => book.shelf === "currentlyReading")} onShelfUpdate={this.updateShelf.bind(this)}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid booksToShow={this.state.books.filter((book) => book.shelf === "wantToRead")} onShelfUpdate={this.updateShelf.bind(this)}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BooksGrid booksToShow={this.state.books.filter((book) => book.shelf === "read")} onShelfUpdate={this.updateShelf.bind(this)}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <SearchResults results={this.state.searchResults} findShelf={this.findShelf.bind(this)} onShelfUpdate={this.updateShelf.bind(this)}/>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
