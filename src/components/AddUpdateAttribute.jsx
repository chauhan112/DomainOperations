import React, { useContext, useEffect, useState } from 'react'
import Cross from '../images/svg/Cross'
import VariableContext from './Context/VariableContext';

export default function AddUpdateAttribute({ setIsModalOpen, itemKey, item, setAddUpdateValues }) {
    const { domains, operations, model, stack, reflectChanges } = useContext(VariableContext);
    const [domain, setDomain] = useState(Object.entries(domains)[0][1].name);
    const [operation, setOperation] = useState(Object.entries(operations)[0][1].name);
    const [name, setName] = useState('');

    useEffect(() => {
        if (itemKey) {
            setName(item.name);
            setDomain(item.domain);
            setOperation(item.operation);
        }
    }, [itemKey]);

    function saveHandler() {
        if (itemKey) {
            model.updateEntry([...stack, 'activities', itemKey], { ...item, modified: new Date().toLocaleString(), name });
        } else {
            const itemKey = Date.now();
            model.addEntry([...stack, 'activities', itemKey], {
                name: name || `${domain}-${operation}`,
                domain, operation,
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
            <div className='bg-slate-300 p-3 rounded'>
                <div className='flex justify-between'>
                    <div>
                        <span className='font-bold text-slate-800'>domain :</span>
                        <select className='px-2 outline-slate-500 mx-2 bg-slate-100 rounded-xl' value={domain} onChange={e => setDomain(e.target.value)}>
                            {Object.keys(domains).map((key) => (<option value={domains[key].name} key={key}>{domains[key].name}</option>))}
                        </select>
                    </div>
                    <div>
                        <span className='font-bold text-slate-800'>operation :</span>
                        <select className='px-2 outline-slate-500 mx-2 bg-slate-100 rounded-xl' value={operation} onChange={e => setOperation(e.target.value)}>
                            {Object.keys(operations).map((key) => (<option value={operations[key].name} key={key}>{operations[key].name}</option>))}
                        </select>
                    </div>
                </div>
                <div className='flex mt-3 gap-1'>
                    <input type="text" placeholder={`${domain}-${operation}`} className='p-1 outline-slate-500 w-full' value={name} onChange={e => setName(e.target.value)} />
                    <button className='bg-green-100 px-2 hover:bg-green-500 cursor-pointer' onClick={saveHandler}>save</button>
                </div>
            </div>
        </>
    )
}
