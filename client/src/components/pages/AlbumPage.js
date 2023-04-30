import React, {useContext, useEffect, useState} from 'react';
import {groupModulo} from '../../utils/collections';
import AlbumItem from '../controls/AlbumItem';
import AlbumToolbar from "../bars/AlbumToolbar";
import Table from "../containers/Table";
import * as gallery from "../../api/gallery";
import {SelectionContext} from "../../Contexts";
import {resetSelection} from "../../utils/selection";

function AlbumPage() {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    useEffect(() => {
        gallery.getAlbums()
            .then((result) => setAlbums(result))
            .catch(() => setAlbums(null))
            .finally(() => {
                resetSelection(selectionContext);
                setLoading(false);
            });
    }, []);

    if (isLoading)
        return <h1>Loading...</h1>;
    if (!albums)
        return <h1>Failed to fetch albums!</h1>

    const table = groupModulo(albums, 6); // 3/2/1 controls in row for lg/md/sm

    return (
        <div className="container-fluid">
            <AlbumToolbar/>
            <hr/>
            <Table item={AlbumItem}>{table}</Table>
        </div>
    );
}

export default AlbumPage;