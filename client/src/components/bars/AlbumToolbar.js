import React, {useCallback, useContext, useState} from 'react';
import SettingItem from "../controls/SettingItem";
import {SelectionContext, UserContext} from "../../Contexts";
import {resetActivePage} from "../../utils/reset";
import AddAlbum from "../modals/AddAlbum";
import {deleteAlbums} from "../../api/current";

function AlbumToolbar({albums, onUpdate}) {
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
    const {
        selectionMode,
        setSelectionMode,
        selection,
        setSelection,
        nextSelectAll,
        setNextSelectAll
    } = selectionContext;
    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);

    const toggleSelection = useCallback(() => {
        resetActivePage(selectionContext, userContext);
        setSelectionMode(!selectionMode)
    }, [selectionContext, selectionMode, setSelectionMode]);
    const selectAll = () => {
        let updatedSelection = new Set(nextSelectAll ? albums.map(image => image.id) : []);
        setSelection(updatedSelection);
        setNextSelectAll(!nextSelectAll);
    }

    const showAddAlbum = useCallback(() => setShowAddAlbumModal(true), [setShowAddAlbumModal]);
    const hideAddAlbum = useCallback(() => setShowAddAlbumModal(false), [setShowAddAlbumModal]);
    const deleteSelected = () => deleteAlbums({selection, onThen: onUpdate, onCatch: alert});

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" onClick={selectAll} hidden={!selectionMode}/>
            <AddAlbum show={showAddAlbumModal} hideModal={hideAddAlbum} onUpdate={onUpdate}/>
            <SettingItem name="add" alt="Добавить" onClick={showAddAlbum}/>
            <SettingItem name="remove" alt="Удалить" onClick={deleteSelected} hidden={!selectionMode}/>
        </div>
    );
}

export default AlbumToolbar;