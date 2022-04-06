import React, {useState} from 'react';
import { DdWrapper, DdHeader, DdList, TitleS, DdListItem} from '../styles';


export default function DropdownMenu(){
    const [open,setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    return(
        <div>
            <DdWrapper>
                <DdHeader
                    tabIndex={0}
                    role="button"
                    onKeyPress={() => toggle()}
                    onClick={() => toggle()}
                >
                    <DdHeader>
                        <TitleS>...</TitleS>
                    </DdHeader>
                </DdHeader>
                {open && (
                    <DdList>
                        <DdListItem>Tweetoscope</DdListItem>
                        <DdListItem>Threadoscope</DdListItem>
                        <DdListItem>Statoscope</DdListItem>
                    </DdList>
                )}
            </DdWrapper>  
        </div>
        
        
    );
}
