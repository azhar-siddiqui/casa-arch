import React from "react";
import SearchFiledImg from "../../assets/SearchFieldsIcons/search-normal.svg";
import ButtonField from "../ButtonsFields/ButtonField";
import "./SearchBar.css";

const SearchBar = (prop) => {
  const {
    searchTxt,
    handleOnclick,
    handleFilter,
    filterDropData,
    className,
    inputProp,
    onClick,
  } = prop;
  return (
    <div className={`SearchDropDownList ${className}`}>
      <div className={`searchField ${className}`}>
        <span className={`searchIcon ${className}`}>
          <img src={SearchFiledImg} alt="SearchIcons" />
        </span>
        <input
          className={`search ${
            searchTxt.length === 0 ? "disable" : "inputActive"
          } ${className} `}
          {...inputProp}
          onChange={handleFilter}
          value={searchTxt}
        />
      </div>
      <ButtonField
        type="button"
        className={`searchtbn mt-3 lg:mt-0 ${
          searchTxt.length === 0 ? "btnDisable" : "btnActive"
        } ${className}`}
        disabled={searchTxt.length === 0 ? true : false}
        onClick={onClick}
      >
        Search
      </ButtonField>
      {filterDropData.length !== 0 && (
        <div className={`DropList ${className}`}>
          {filterDropData.map((item) => (
            <p
              className={`listItem text-left ${className}`}
              key={item.id}
              onClick={handleOnclick}
            >
              {item.type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
