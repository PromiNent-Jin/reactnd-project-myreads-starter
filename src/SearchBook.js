import React, { Component } from 'react'
import {Link} from "react-router-dom"
import * as BooksAPI from "./utils/BooksAPI"

class SearchBook extends Component {
  state = {
    searchResult:[],
    query:'',
    selected:[]
  }

  change = (book, shelf) => {
    BooksAPI.update(book, shelf).then(()=>
      this.props.updateBookInfo()
    )
  }

  updateQuery = (query) => {
    this.setState({query:query.trim()})
    if(this.state.query) {
      BooksAPI.search(query).then((books) => {
        this.setState({searchResult: books})
      })
    }
  }

  clearQuery = () => {
    this.setState({ query:'' })
  }

  render(){
    const defaultCoverImage = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
             <div className="search-books-input-wrapper">
               <input type="text" placeholder="Search by title or author" value = {this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
             </div>
             <button onClick={() => this.clearQuery()} className='search-remove'>Remove</button>
          </div>
         <div className="search-books-results">
           <ol className="books-grid">
           {this.state.searchResult && this.state.searchResult.map ((searchResult) => (
             <li key={searchResult.id}>
              <div className = "book">
               <div className = "book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks?this.props.book.imageLinks.thumbnail:defaultCoverImage})`}}> </div>
                <div className = "book-shelf-changer">
                 <select value={searchResult.shelf} onChange={(event) => this.change(searchResult, event.target.value)}>
                  <option value = "move">Move to...</option>
                  <option value = "currentlyReading">Currently Reading</option>
                  <option value = "wantToRead">Want To Read</option>
                  <option value = "read">Read</option>
                  <option value = "none">None</option>
                 </select>
                </div>
               </div>
               <div className = "book-title">{searchResult.title}</div>
               <div className = "book-authors">{searchResult.authors}</div>
              </div>
             </li>
           ))}
           </ol>
         </div>
       </div>
    )
  }
}

export default SearchBook
