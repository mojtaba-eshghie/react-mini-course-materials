import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();


    // Following is a way to execute the 'addEventListener' code to the page just once
    useEffect(() => {
        
        const onBodyClick= (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            console.log('body clicked..')
            setOpen(false);
        }

        document.body.addEventListener('click', onBodyClick);

        return () => {
            //cleanup:
            /**
             * Since we have a toggle in the App that toggles showing of Dropdown, we need to set this
             * cleanup so that when we click on toggle (in which case it will invoke this event listener.
             * Because as rule of thumb the event listeners added to the DOM will have priority on React
             * even listeners we define (smt like onClick, ...)) this cleanup code will execute that will
             * give us an opportunity to remove the event listener on body!!!! ( we will use the cleanup 
             * function of the same event listener to cancel the next hit of this event listener)
            */
           document.body.removeEventListener('click', onBodyClick);
        }
    }, [])


    const renderedOptions = options.map(option => {
        if (option.value === selected.value) {
            /* 
            * null in react means `don't render anything` (for this) particular element that is already selected
             */
            return null;
        }

        return (
            <div key={option.value} className="item" onClick={ () => { onSelectedChange(option); console.log('item clicked;')} }>
                {option.label}
            </div>
        )
    });



    
    
    // main component return 
    return (
        <div className="ui form" ref={ref}>
            <div className="field">
                <label className="label">
                    Select a Color
                </label>
                <div className={`ui selection dropdown ${ open ? 'visible active' : ''}`} onClick={ () => { setOpen(!open); } }>
                    <i className="dropdown icon"></i>
                    <div className="text">
                        {selected.label}
                    </div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Dropdown;