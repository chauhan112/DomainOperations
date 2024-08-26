import React, { useContext, useEffect, useState } from 'react'
import Clock from '../images/svg/Clock'
import Pen from '../images/svg/Pen'
import VariableContext from './Context/VariableContext';
import { useNavigate, useParams } from 'react-router-dom';


export default function Editor() {
    const { logId } = useParams();
    const { model, stack, selected, reflectChanges, activities } = useContext(VariableContext);
    const [formDetails, setFormDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (logId !== 'new') {
            const logs = activities[selected.key].logs;
            setFormDetails(logs[parseInt(logId)]);
        }
    }, [])


    function formDetailChangeHandler(e) {
        const name = e.target.name;
        setFormDetails((prev) => ({ ...prev, [name]: e.target.value }));
    }

    function saveHandler() {
        if (logId === 'new') {
            model.addEntry([...stack, selected.type, selected.key, 'logs', Date.now()], { ...formDetails });
        } else {
            model.updateEntry([...stack, selected.type, selected.key, 'logs', parseInt(logId)], { ...formDetails, modified: new Date().toLocaleString() });
        }
        reflectChanges();
        navigate(-1);
    }

    return (
        <div className='h-dvh bg-slate-500'>
            <div className='bg-teal-200'>
                <div className='py-5 px-7'>
                    <input type="text" placeholder='Activity Name' name='title' className='outline-teal-500 text-3xl mb-3 font-bold bg-teal-200 border pb-1 px-2' value={formDetails.title || ''} onChange={formDetailChangeHandler} />
                    <div className='flex gap-3 mb-3'>
                        <div className='w-5'><Clock /></div>
                        <div className='font-semibold'>Created</div>
                        <input type="text" className='ms-5 px-2 outline-teal-300 rounded bg-teal-100' disabled={true} value={logId === 'new' ? new Date().toLocaleString() : new Date(parseInt(logId)).toLocaleString()} />
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-5'><Pen /></div>
                        <div className='font-semibold'>Modified</div>
                        <input type="text" className='ms-3 px-2 outline-teal-300 rounded bg-teal-100' disabled={true} value={formDetails.modified || new Date().toLocaleString()} />
                    </div>
                </div>
            </div>
            <div className='p-5' style={{ height: '80dvh' }}>
                <textarea name="did" placeholder='Did' className='mb-3 outline-slate-500 px-3 py-2 w-full rounded-xl' style={{ height: '30dvh' }} value={formDetails.did || ''} onChange={formDetailChangeHandler} />
                <textarea name="next" placeholder='Next' className='mb-3 outline-slate-500 px-3 py-2 w-full rounded-xl' style={{ height: '30dvh' }} value={formDetails.next || ''} onChange={formDetailChangeHandler} />
                <div className='flex gap-5 justify-end'>
                    <div className='bg-red-500 w-fit px-10 py-1 font-bold rounded-xl cursor-pointer on hover:bg-red-600' onClick={() => navigate(-1)}>cancel</div>
                    <div className='bg-green-500 w-fit px-10 py-1 font-bold rounded-xl cursor-pointer on hover:bg-green-600' onClick={saveHandler}>save</div>
                </div>
            </div>
        </div>
    )
}
