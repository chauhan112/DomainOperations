export function addData(stack, setData, newData, typ) {
    setData((prev) => {
        const allData = { ...prev };
        let node = allData;
        stack.forEach(item => {
            node = node[item]
        });
        node[typ][newData.key] = newData.value;
        storeData(allData)
        return allData;
    })
}

export function popAvalue(stack, setData, typ, key) {
    let value = 'same';
    setData((prev) => {
        const allData = { ...prev };
        let node = allData;
        stack.forEach(item => {
            node = node[item]
        });
        value = { ...node[typ][key] };
        delete node[key];
        return { ...allData };
    })
    return value;
}

function storeData(jsonObject) {
    let jsonString = JSON.stringify(jsonObject);
    localStorage.setItem("data", jsonString);
}