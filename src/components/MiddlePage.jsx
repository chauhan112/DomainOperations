import React, { useContext } from 'react'
import UpDown from '../images/svg/UpDown'
import Cog from '../images/svg/Cog'
import TableUI from './TableUI'
import VariableContext from './Context/VariableContext';
import { useNavigate } from 'react-router-dom';
import Plus from '../images/svg/Plus';
import Greater from '../images/svg/Greater';

export default function MiddlePage() {
    const { stack, selected, model } = useContext(VariableContext);
    const navigate = useNavigate();

    function onBreadCrumbClick(index) {
        if (index === 0) {
            navigate('/root');
        } else {
            const routes = stack.slice(0, index + 2);
            navigate(`/${routes.join('/')}`);
        }
    }
    function getName(arr, i){
        let newArr= arr.slice(0, i+1)
        if (newArr.length == 1) return newArr[0]
        return model.readEntry([...newArr.slice(0, i+1), "name"])
    }

    return (
        <div className='w-full border-r border-gray-600 bg-gray-200 relative'>
            <div className='p-4 px-6 flex flex-wrap'>
                {/* <span className='hover:opacity-20 cursor-pointer' onClick={() => onBreadCrumbClick(-1)}>root</span> */
                    // console.log(stack)getName
                }
                
                {stack.map((item, i) => {

                    if (stack.length == 1){
                        
                    }
                    else if (['domains', 'operations', 'activities'].includes(item)) {
                        return <span key={i} className='px-1' >/</span>
                    } else if (item === 'space') {
                        return ''
                    }
                    return <span key={i} className='hover:underline underline-offset-2 cursor-pointer' onClick={() => onBreadCrumbClick(i)}>{getName(stack, i)}</span>
                })}
            </div>
            <hr className='border-gray-600' />
            <div className='p-3 flex justify-between gap-3'>
                <div className='font-bold'>{selected.type === 'activities' ? selected.name : 'Activity_name'}</div>
                <div className='flex-grow'>
                    <input type="text" className='rounded-full ps-2 bg-white w-full outline-gray-300' placeholder='search' />
                </div>
                <div className='w-6'><UpDown /></div>
                <div className='w-6'><Cog /></div>
            </div>
            <hr className='border-gray-600' />
            <div className='flex-grow m-3'><TableUI /></div>

            <button className='w-5 absolute bottom-2 left-1/2 bg-teal-400 rounded hover:rounded-full'><Greater /></button>
            <button className='w-10 p-2 absolute bottom-5 right-5 bg-teal-400 rounded-full hover:rounded-xl' onClick={() => { if (selected.type === 'activities') navigate('/editor/new') }}><Plus /></button>
        </div>
    )
}
// {stack.map((item, i) => <div key={i}><span className='px-1'>/</span><span className='hover:underline underline-offset-2 cursor-pointer' onClick={() => onBreadCrumbClick(i)}>{item}</span></div>)}

// {stack.map((item, i) => {
//     if (['domains', 'operations', 'activities'].includes(item)) {
//         return <span key={i} className='px-1'>/</span>
//     }
//     return <span key={i} className='hover:underline underline-offset-2 cursor-pointer' onClick={() => onBreadCrumbClick(i)}>{item}</span>
// })}