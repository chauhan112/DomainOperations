import React, { useContext, useState } from 'react'
import Greater from '../images/svg/Greater';
import Lesser from '../images/svg/Lesser';
import Plus from '../images/svg/Plus';
import VariableContext from './Context/VariableContext';
import CustomModal from './Utilities/CustomModal';
import AttributeForm from './AttributeForm';
import Bin from '../images/svg/Bin';
import Pencil from '../images/svg/Pencil';
import Confirmation from './Utilities/Confirmation';

export default function RightSide({ smallScreen, showRightSide, setShowRightSide }) {
    return (
        <div>
            {
                smallScreen ?
                    <>
                        {showRightSide && <div className='fixed right-0 bg-white h-full border-s border-gray-600'>
                            <PageContent />
                            <div className='fixed bottom-2 right-2 cursor-pointer w-8 p-1 hover:bg-slate-300 rounded-full' onClick={() => setShowRightSide(false)}><Greater /></div>
                        </div>}
                    </>
                    :
                    <>
                        {showRightSide && <><PageContent /> <div className='fixed bottom-2 right-2 cursor-pointer w-8 p-1 hover:bg-slate-300 rounded-full' onClick={() => setShowRightSide(false)}><Greater /></div></>}
                    </>
            }
            {!showRightSide && <div className='cursor-pointer bg-slate-700 flex items-center text-white h-full w-4' onClick={() => setShowRightSide(true)}><Lesser /></div>}
        </div>
    )
}

function PageContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatingItem, setUpdatingItem] = useState({});
    const { model, selected, setSelected, stack } = useContext(VariableContext);
    const attkeys = Object.keys(selected.attributes || {});

    const [addUpdateValues, setAddUpdateValues] = useState({});


    function deleteAnAttribut(key) {
        if (Confirmation('Are you sure?')) {
            model.deleteEntry([...stack, selected.type, selected.key, 'attributes', key]);
            setSelected((prev) => {
                const attributes = { ...prev.attributes };
                delete attributes[key];
                return { ...prev, attributes };
            })
        }
    }

    function onCreate() {
        setAddUpdateValues({ setIsModalOpen, setAddUpdateValues });
        setIsModalOpen(true);
    }

    function onEditClick(attKey, value) {
        setAddUpdateValues({ setIsModalOpen, attKey, value, setAddUpdateValues });
        setIsModalOpen(true);
    }

    return (
        <div>
            <CustomModal {...{ isModalOpen, setIsModalOpen, top: 50, outClick: false }}>
                <AttributeForm {...addUpdateValues} />
            </CustomModal>
            <div className='p-3 flex bg-slate-700 gap-2 font-bold'>
                <div className=' text-white'>Attributes</div>
                <input type="text" className='m-1 rounded-full ps-2 bg-white' placeholder='search' />
                <div className='text-white text-xl w-5' onClick={onCreate}><Plus /></div>
            </div>
            <div className='p-3'>
                <table className="w-full text-left">
                    <thead className='bg-gray-300'>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>created</td>
                            <td>{new Date(parseInt(selected.key)).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>modified</td>
                            <td>{new Date(parseInt(selected.key)).toLocaleString()}</td>
                        </tr>
                        {attkeys.map((key) => {
                            const value = typeof (selected.attributes[key]) === 'object' ? JSON.stringify(selected.attributes[key]) : selected.attributes[key];
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value || '-'}</td>
                                    <td>
                                        <div className='flex'>
                                            <div className='w-5 text-red-500' onClick={() => deleteAnAttribut(key)}><Bin /></div>
                                            <div className='w-5 text-green-500' onClick={() => onEditClick(key, selected.attributes[key])}><Pencil /></div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

