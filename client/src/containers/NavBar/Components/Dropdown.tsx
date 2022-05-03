import React, {useState} from 'react';
import {Main, DropDownContainer, DropDownHeader, DropDownList, DropDownListContainer, ListItem} from '../styles';
import onClickOustide, { HandleClickOutside } from "react-onclickoutside";


function DropdownMenu(){
    
    const options = ["Tweetoscope", "Threadoscope", "Statoscope"];

    const [isOpen, setIsOpen] = useState(false);
    

    const [selectedValue, setSelectedValue] = useState('');

    const selectOption = (value: any) => {
        setSelectedValue(value);
        setIsOpen(false);
    }


    const toggling = () => setIsOpen(!isOpen);

    return(
        <Main>
            <DropDownContainer>
                <DropDownHeader onClick={toggling}>
                    {selectedValue ? selectedValue : "..."}
                </DropDownHeader>
                {isOpen && (
                    <DropDownListContainer>
                        <DropDownList>
                            {options.map(option => (
                                <ListItem onClick={() => selectOption(option)}>
                                    {option}
                                </ListItem>
                            ))}
                        </DropDownList>
                    </DropDownListContainer>
                )}
            </DropDownContainer>
        </Main>        
    );
}




export default DropdownMenu;


