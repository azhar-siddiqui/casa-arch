import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRedirectToSteppers, updateVisibleForUserLogin } from "../../app/slices/user";
import { updateIsStepperVisible, updateSearchedProfessional } from "../../app/slices/userStepper";
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
    fromHomePage
  } = prop;
  // console.log(onClick);

  const { isLoggedIn, userType } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSearch = () => {
    if (fromHomePage) {
      dispatch(updateSearchedProfessional(searchTxt))
      if (!isLoggedIn) {
        dispatch(updateRedirectToSteppers(true))
        dispatch(updateVisibleForUserLogin(true))
      }
      isLoggedIn && userType === "Customer" && dispatch(updateIsStepperVisible(true))
    }
  }

  return (
    <div className={`SearchDropDownList ${className}`}>
      <div className={`searchField ${className}`}>
        <span className={`searchIcon ${className}`}>
          <img src={SearchFiledImg} alt="SearchIcons" />
        </span>
        <input
          className={`search placeholder:text-sm 
          ${searchTxt.length === 0 ? "disable" : "inputActive"
            } ${className} `}
          {...inputProp}
          onChange={handleFilter}
          value={searchTxt}
        />
      </div>
      <ButtonField
        type="button"
        className={`searchtbn mt-3 lg:mt-0 ${searchTxt.length === 0 ? "btnDisable" : "btnActive"
          } ${className}`}
        disabled={searchTxt.length === 0 ? true : false}
        onClick={() => {
          handleSearch !== undefined && handleSearch();
          onClick !== undefined && onClick()
        }}
      >
        Search
      </ButtonField>
      {filterDropData.length !== 0 && (
        <div className={`DropList ${className}`}>
          {filterDropData.map((item) => (
            <p
              className={`listItem text-left border border-[#6D747A] lg:w-4/6 ${className}`}
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
