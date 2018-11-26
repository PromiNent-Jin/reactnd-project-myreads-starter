import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SearchBook from './SearchBook'
import * as BooksAPI from "./utils/BooksAPI"

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookInfo: PropTypes.func.isRequired
  }

  change = (book, shelf) => {
    BooksAPI.update(book, shelf).then(()=>
      this.props.updateBookInfo()
    )
  }

  render() {
    return (
      <div className = "list-books">
       <div className = "list-books-title">
        <h1>MyReads</h1>
       </div>
       <div className = "list-books-contents">
        <div className = "bookshelf">
         <h2 className = "bookshelf-title">Currently Reading</h2>
         <div className = "bookshelf-books">
           <ol className = "books-grid">
             {this.props.books.map ((currentlyBook) => (
               currentlyBook.shelf === "currentlyReading" && (
                 <li key = {currentlyBook.id}>
                  <div className = "book">
                   <div className = "book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${currentlyBook.imageLinks.thumbnail})`}}> </div>
                    <div className = "book-shelf-changer">
                    <select onChange={(event) => this.change(currentlyBook, event.target.value)}>
                        <option value="never">Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want To Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                   </div>
                   <div className = "book-title">{currentlyBook.title}</div>
                   <div className = "book-authors">{currentlyBook.authors}</div>
                  </div>
                 </li>
               )
             ))}
           </ol>
         </div>
        </div>

        <div className = "bookshelf">
         <h2 className = "bookshelf-title">Want To Read</h2>
         <div className = "bookshelf-books">
           <ol className = "books-grid">
           {this.props.books.map ((want) => (
             want.shelf === "wantToRead" && (
               <li key = {want.id}>
                <div className = "book">
                 <div className = "book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${want.imageLinks.thumbnail})`}}> </div>
                  <div className = "book-shelf-changer">
                  <select onChange={(event) => this.change(want, event.target.value)}>
                  <option value="never">Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want To Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                  </select>
                  </div>
                 </div>
                 <div className = "book-title">{want.title}</div>
                 <div className = "book-authors">{want.authors}</div>
                </div>
               </li>
             )
           ))}
           </ol>
         </div>
        </div>

        <div className = "bookshelf">
         <h2 className = "bookshelf-title">Read</h2>
         <div className = "bookshelf-books">
           <ol className = "books-grid">
           {this.props.books.map ((read) => (
             read.shelf === "read" && (
               <li key = {read.id}>
                <div className = "book">
                 <div className = "book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${read.imageLinks.thumbnail})`}}> </div>
                  <div className = "book-shelf-changer">
                  <select onChange={(event) => this.change(read, event.target.value)}>
                  <option value="never">Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want To Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                  </select>
                  </div>
                 </div>
                 <div className = "book-title">{read.title}</div>
                 <div className = "book-authors">{read.authors}</div>
                </div>
               </li>
             )
           ))}
           </ol>
         </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
       </div>
      </div>
    )
  }
}

export default BookList
