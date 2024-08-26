import React, { useState } from 'react'
import Greater from '../images/svg/Greater'
import Down from '../images/svg/Down'
import Plus from '../images/svg/Plus'
import AddUpdateAttribute from './AddUpdateAttribute';
import CustomModal from './Utilities/CustomModal';
import Pencil from '../images/svg/Pencil';
import Bin from '../images/svg/Bin';

export default function ActivitiesAccord({ domains, operations, activities, insertInStack, setSelected, selected, removeData }) {
    const [collapsed, setCollapsed] = useState(localStorage.getItem('accordion-activities') === 'true');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addUpdateValues, setAddUpdateValues] = useState({});

    function collapseHandler(status) {
        localStorage.setItem('accordion-activities', status);
        setCollapsed(status);
    }

    function onCreate() {
        if (Object.keys(domains).length > 0 && Object.keys(operations).length > 0) {
            setAddUpdateValues({ setIsModalOpen, setAddUpdateValues })
            setIsModalOpen(true);
            setCollapsed(false)
        }
    }
    function onEditClick(itemKey, item) {
        setAddUpdateValues({ setIsModalOpen, itemKey, item, setAddUpdateValues });
        setIsModalOpen(true);
    }

    return (
        <div>
            <CustomModal {...{ isModalOpen, setIsModalOpen, top: 30 }}>
                <AddUpdateAttribute {...addUpdateValues} />
            </CustomModal>
            <div className='flex justify-between'>
                <div className='cursor-pointer font-bold p-2 flex gap-1 w-full'
                    onClick={() => collapseHandler(!collapsed)}>
                    {collapsed ? <div className='w-6'><Greater /></div> : <div className=' w-6'><Down /></div>} Activities
                </div>
                <div className='cursor-pointer w-10 px-2' onClick={onCreate}><Plus /></div>
            </div>
            {!collapsed && <div className='ms-9 pb-2 pr-2'>
                {activities && Object.keys(activities).map((key, index) => (
                    <div className='flex' key={index}>
                        <div className='flex gap-5 cursor-pointer w-full mr-2'>
                            <div className={selected.key === key ? 'underline underline-offset-2' : 'hover:underline'}
                                onClick={() => setSelected({ ...activities[key], key, type: 'activities' })}>{activities[key].name}</div>
                            <div className='hover:opacity-50 flex-grow flex flex-row-reverse' onClick={() => insertInStack('activities', key)}>
                                <div className='w-5'><Greater /></div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='w-5' onClick={() => onEditClick(key, activities[key])}><Pencil /></div>
                            <div className='w-5' onClick={() => removeData('activities', key)}><Bin /></div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}
