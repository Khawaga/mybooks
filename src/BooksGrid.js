import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BooksGrid extends Component {
  static propTypes = {
    booksToShow: PropTypes.array.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
  }

  render() {
    const { booksToShow, onShelfUpdate } = this.props

    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {booksToShow.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(event) => onShelfUpdate(book, event)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors[0] : ''}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default BooksGrid;
