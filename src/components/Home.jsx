import React, { useContext, useEffect, useState } from 'react';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import MiddlePage from './MiddlePage';
import { useParams } from 'react-router-dom';
import VariableContext from './Context/VariableContext';

export default function Home() {
    const { '*': url } = useParams();
    const [showLeftSide, setShowLeftSide] = useState(window.innerWidth > 768);
    const [showRightSide, setShowRightSide] = useState(false); //window.innerWidth > 768
    const [smallScreen, setSmallScreen] = useState(window.innerWidth < 768);
    const { setStack } = useContext(VariableContext);

    useEffect(() => {
        if (url)
            setStack(url.split('/'));
    }, [url])

    return (
        <>
            <div className='flex h-dvh'>
                <LeftSide {...{ smallScreen, showLeftSide, setShowLeftSide }} />
                <MiddlePage />
                <RightSide {...{ smallScreen, showRightSide, setShowRightSide }} />
            </div >
        </>
    );
}
/*

*/