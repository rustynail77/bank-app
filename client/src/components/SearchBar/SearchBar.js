import React, {useContext} from 'react';
import { useDispatch } from 'react-redux';
import {AppContext} from '../../App';
import { filterPosts } from '../../actions/posts';
// import posts from '../../reducers/posts';

const SearchBar = () => {

    const dispatch = useDispatch();
    const {setFilteredPosts, cities} = useContext(AppContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postsFilter = {};
        if (e.target.has_mortgage.value) 
            postsFilter.haveMortgage = { 
                $regex : e.target.has_mortgage.value,$options:'i'
            };
        if (e.target.cities.value) {
            let tempArr = [];
            for (let i=0; i<e.target.cities.selectedOptions.length; i++) {
                tempArr.push(e.target.cities.selectedOptions[i].value);
            }
            postsFilter.city = tempArr;
        }
        if (e.target.credit_cards_from && e.target.credit_cards_to) {
            postsFilter.numCreditCards = {
                $gte: e.target.credit_cards_from.value,
                $lte: e.target.credit_cards_to.value,
            }
        }
            
        
        if (e.target.balance_from.value && e.target.balance_to.value) {
            postsFilter.balance = {
                $gte: e.target.balance_from.value,
                $lte: e.target.balance_to.value
            }
        } else if (e.target.balance_from.value && !e.target.balance_to.value) {
            postsFilter.balance = {
                $gte: e.target.balance_from.value
            }
        } else if (!e.target.balance_from.value && e.target.balance_to.value) {
            postsFilter.balance = {
                $lte: e.target.balance_to.value
            }
        }
   
        console.log('postsFilter:',postsFilter);
        const filtered = await dispatch(filterPosts(postsFilter));
        setFilteredPosts(filtered);
    }
    

    return (
        <>
            <form className='search-form' method='post' onSubmit={handleSubmit}>
                <h3>Filter:</h3>
                Balance between <input type='text' name='balance_from' />
                and <input type='text' name='balance_to' />
               
                # of credit cards from <input type='number' name='credit_cards_from' />
                to <input type='number' name='credit_cards_to' />

                <br/>
                Has a mortgage?
                <select name='has_mortgage' defaultValue=''>
                    <option value='' disabled>---Select---</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>
                
                Filter cities (Hold 'ctrl' for multiple selection)<select multiple name='cities' type='text'>
                    <option value='' disabled>---Select---</option>
                    {
                        (!cities) ? <></> :
                            cities.map((city,i)=>
                                <option key={i} value={city}>
                                    {city}
                                </option>
                        )
                    }
                </select>
                <button type='submit' value='submit'>Submit</button>
            </form>
        </>
    )

}

export default SearchBar;