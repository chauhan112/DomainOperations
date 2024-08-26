import React, { useContext, useEffect, useState } from 'react'
import Cross from '../images/svg/Cross'
import VariableContext from './Context/VariableContext';

export default function AttributeForm({ setIsModalOpen, attKey, value, setAddUpdateValues }) {
    const [inptype, setInptype] = useState('default');
    const [inputKey, setInputKey] = useState('');
    const [inputValue, setInputValue] = useState('');
    const { model, selected, setSelected, stack, reflectChanges } = useContext(VariableContext);

    useEffect(() => {
        if (attKey) {
            setInputKey(attKey)
            if (typeof (value) === 'object') {
                setInptype('json');
                setInputValue(JSON.stringify(value));
            } else {
                setInputValue(value);
            }
        }
    }, [attKey]);


    function onSave() {
        if (inputKey.trim().length > 0 && inputValue.trim().length > 0) {
            const _value = inptype === 'json' ? JSON.parse(inputValue) : inputValue;
            if (attKey) {
                model.updateEntry([...stack, selected.type, selected.key, 'attributes', attKey], _value);
                setSelected((prev) => ({ ...prev, attributes: { ...prev.attributes, [attKey]: _value } }));
            } else {
                model.addEntry([...stack, selected.type, selected.key, 'attributes', inputKey], _value);
                setSelected((prev) => ({ ...prev, attributes: { ...prev.attributes, [inputKey]: _value } }));
            }
            setIsModalOpen(false);
            setAddUpdateValues({});
            reflectChanges();
        }
    }

    return (
        <>
            <div className='flex justify-end mb-2'><div className='w-5 hover:bg-red-600 text-gray-200' onClick={() => setIsModalOpen(false)}><Cross /></div></div>
            <div className='bg-slate-300 p-3 pb-2'>
                <div>
                    <div className='flex'>
                        <input type="text" placeholder='key' className='p-1 outline-slate-500 w-full'
                            value={inputKey} onChange={e => setInputKey(e.target.value)} />
                        <select className='p-1 px-3 outline-slate-500 mx-2' value={inptype} onChange={e => setInptype(e.target.value)}>
                            <option value="default">raw</option>
                            <option value="json">json</option>
                        </select>
                        <button className='bg-green-100 px-2 hover:bg-green-500 cursor-pointer' onClick={onSave}>OK</button>
                    </div>
                    <textarea className='p-1 mt-2 w-full outline-slate-500' placeholder='value' value={inputValue} onChange={e => setInputValue(e.target.value)}></textarea>
                </div>
            </div>
        </>
    )
}

