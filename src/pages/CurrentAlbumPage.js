import React from 'react';
import {groupModulo} from "../utils/collections";
import ImageToolbar from "../components/ImageToolbar";
import Table from "../components/Table";
import ImageItem from "../components/ImageItem";


let images = [
    {id: 4, name: 4},
    {id: 5, name: 5},
    {id: 6, name: 4},
    {id: 7, name: 5},
    {id: 8, name: 4},
    {id: 9, name: 5}
];

function CurrentAlbumPage() {
    const table = groupModulo(images, 4);

    return (
        <div className="container-fluid">
            <ImageToolbar/>
            <hr/>
            <Table item={ImageItem}>{table}</Table>
        </div>
    );
}

export default CurrentAlbumPage;