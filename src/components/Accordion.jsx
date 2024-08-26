import React, { useEffect, useRef, useState } from 'react'
import Greater from '../images/svg/Greater';
import Down from '../images/svg/Down';
import Pencil from '../images/svg/Pencil';
import Bin from '../images/svg/Bin';
import Plus from '../images/svg/Plus';
import CustomModal from './Utilities/CustomModal';
import AddUpdateForm from './AddUpdateForm';

export default function Accordion({ title, items, insertInStack, removeData, setSelected, selected, reflectChanges }) {
    const [collapsed, setCollapsed] = useState(localStorage.getItem('accordion-' + title) === 'true');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addUpdateValues, setAddUpdateValues] = useState({});


    function collapseHandler(status) {
        localStorage.setItem('accordion-' + title, status);
        setCollapsed(status);
    }

    function onCreate() {
        setAddUpdateValues({ setIsModalOpen, space: title.toLowerCase(), reflectChanges, setAddUpdateValues });
        setIsModalOpen(true);
    }

    function onEditClick(itemKey, item) {
        setAddUpdateValues({ setIsModalOpen, itemKey, item, space: title.toLowerCase(), reflectChanges, setAddUpdateValues });
        setIsModalOpen(true);
    }

    return (
        <div>
            <CustomModal {...{ isModalOpen, setIsModalOpen, outClick: false }}>
                <AddUpdateForm {...addUpdateValues} />
            </CustomModal>
            <div className='flex justify-between'>
                <div className='cursor-pointer font-bold p-2 flex gap-1 w-full'
                    onClick={() => collapseHandler(!collapsed)}>
                    {collapsed ? <div className='w-6'><Greater /></div> : <div className=' w-6'><Down /></div>} {title}
                </div>
                <div className='cursor-pointer w-10 px-2' onClick={onCreate}><Plus /></div>
            </div>
            {!collapsed && <div className='ms-9 pb-2 pr-2'>
                {items && Object.keys(items).map((key, index) => (
                    <div className='flex' key={index}>
                        <div className='flex gap-5 cursor-pointer w-full mr-2'>
                            <div className={selected.key === key ? 'underline underline-offset-2' : 'hover:underline'}
                                onClick={() => setSelected({ ...items[key], key, type: title.toLowerCase() })}>{items[key].name}</div>
                            <div className='hover:opacity-50 flex-grow flex flex-row-reverse' onClick={() => insertInStack(title.toLowerCase(), key)}>
                                <div className='w-5'><Greater /></div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='w-5' onClick={() => onEditClick(key, items[key])}><Pencil /></div>
                            <div className='w-5' onClick={() => removeData(title.toLowerCase(), key)}><Bin /></div>
                        </div>
                    </div>
                ))}
            </div>}
            <hr className='border-gray-600' />
        </div >
    )
}
