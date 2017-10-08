import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchResults extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    findShelf: PropTypes.func.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
  }

  render() {
    const { results, findShelf, onShelfUpdate } = this.props

    return (
      <ol className="books-grid">
        {results.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={findShelf(book)} onChange={(event) => onShelfUpdate(book, event)}>
                  <option value="" disabled>Move to...</option>
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
    )
  }
}

export default SearchResults;
