import React, { useContext, useEffect, useRef, useState } from 'react'
import Cross from '../images/svg/Cross'
import VariableContext from './Context/VariableContext';

export default function AddUpdateForm({ setIsModalOpen, itemKey, item, space, reflectChanges, setAddUpdateValues }) { // itemKey, old values, reflect changes,space
    const [title, setTitle] = useState('');
    const { model, stack } = useContext(VariableContext);
    const inputFieldRef = useRef(null);

    useEffect(() => {
        if (itemKey) {
            setTitle(item.name);
        } else {
            setTimeout(() => {
                inputFieldRef.current.focus();
            }, 200);
        }
    }, [itemKey]);

    function saveHandler() {
        if (itemKey) {
            model.updateEntry([...stack, space, itemKey], { ...item, modified: new Date().toLocaleString(), name: title });
        } else {
            const itemKey = Date.now();
            model.addEntry([...stack, space, itemKey], {
                name: title,
                modified: new Date(parseInt(itemKey)).toLocaleString(),
                attributes: {},
                space: {},
            })
        }
        reflectChanges();
        setAddUpdateValues({});
        setIsModalOpen(false);
    }

    return (
        <>
            <div className='flex justify-end mb-2'><div className='w-5 hover:bg-red-600 text-gray-200' onClick={() => setIsModalOpen(false)}><Cross /></div></div>
            <div className='bg-slate-300 p-2 rounded'>
                <div className='flex'>
                    <input type="text" ref={inputFieldRef} placeholder='name' className='p-1 px-2 outline-slate-500 w-full' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button className='ms-1 bg-green-100 px-2 hover:bg-green-500 cursor-pointer' onClick={saveHandler}>save</button>
                </div>
            </div>
        </>
    )
}
