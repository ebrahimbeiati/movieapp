const SearchBox = (props)=>{
    return(
        <div className="col col-sm-4">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={props.value} onChange={(event)=> props.setSearchValue(event.target.value)}/>

        </div>
    )
}
export default SearchBox;