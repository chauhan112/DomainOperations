import React, { useContext, useEffect, useState } from 'react'
import Eye from '../images/svg/Eye'
import Pencil from '../images/svg/Pencil'
import Bin from '../images/svg/Bin'
import VariableContext from './Context/VariableContext';
import Confirmation from './Utilities/Confirmation';
import { useNavigate } from 'react-router-dom';

export default function TableUI() {
    const { model, stack, selected, activities, reflectChanges } = useContext(VariableContext);
    const [logs, setLogs] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (selected.type === 'activities' && activities[selected.key]) {
            setLogs(activities[selected.key].logs || {});
        }
    }, [activities, selected])

    function deleteHandler(key) {
        if (Confirmation('Are you sure?')) {
            model.deleteEntry([...stack, selected.type, selected.key, 'logs', key]);
            reflectChanges();
        }
    }


    return (
        <table className="w-full">
            <thead className='text-left bg-yellow-400'>
                <tr>
                    <th className=' py-4 ps-2'>Column Name</th>
                    <th className=' py-4'>Activity Name</th>
                    <th className='hidden md:table-cell py-4'>Status</th>
                    <th className='hidden md:table-cell py-4'>Date</th>
                    <th className='text-center py-4'>Action</th>
                </tr>
            </thead>
            {/* <hr className='border-4'/> */}
            <tbody>
                {selected.type === 'activities' && Object.keys(logs).map((key, i) => (
                    <tr className='bg-white' key={key}>
                        <td>{i + 1}.</td>
                        <td>{logs[key].title}</td>
                        <td className='hidden md:table-cell'>mark</td>
                        <td className='hidden md:table-cell'>{new Date(parseInt(key)).toLocaleString()}</td>
                        <td><div className='flex justify-between'>
                            <div className='w-6'><Eye /></div>
                            <div className='w-6' onClick={() => navigate(`/editor/${key}`)}><Pencil /></div>
                            <div className='w-6' onClick={() => deleteHandler(key)}><Bin /></div>
                        </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
