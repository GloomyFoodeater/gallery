import React, {useCallback, useContext} from 'react';
import {SelectionContext} from "../../Contexts";

function ImageItem({id, name}) {
    const {selectionMode, selection, setSelection} = useContext(SelectionContext);
    const onChange = useCallback(() => {
        if (selection.has(id)) selection.delete(id);
        else selection.add(id);
        setSelection(new Set(selection))
    }, [id, selection, setSelection]);
    const checked = selection.has(id);
    const display = selectionMode ? "inline-block" : "none";
    const imagePath = `${process.env.REACT_APP_API_URL}/images/${id}`;

    const img = <img src={imagePath} alt={name} className="img-fluid"/>;

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 wrapper">
            {selectionMode
                ? <label htmlFor={`img-check-${id}`}>{img}</label>
                : <a data-fancybox="gallery" href={imagePath}>{img}</a>
            }
            <br/>
            <input id={`img-check-${id}`} type="checkbox" value={id} style={{display}} checked={checked}
                   onChange={onChange}
                   className="checkbox"/>
            {selectionMode
                ? <label htmlFor={`img-check-${id}`}>{name}</label>
                : <a href={imagePath} className="itemName" download>{name}</a>
            }
        </div>
    );
}

export default ImageItem;