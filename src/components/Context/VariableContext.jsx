import { createContext, useState } from "react";
import { addItem, removeItem } from "./stackActions";
import { addData, popAvalue } from "./dataActions";
import { LocalStorageJSONModel } from "./LocalStorageJSONModel";

const VariableContext = createContext();
export default VariableContext;

export const VariableProvider = ({ children }) => {
    const stringdata = localStorage.getItem("data");
    const [data, setData] = useState(JSON.parse(stringdata) || { domains: {}, operations: {}, activities: {} });
    const [stack, setStack] = useState(['root']);
    const [selected, setSelected] = useState({});
    const model = new LocalStorageJSONModel();

    const [domains, setDomains] = useState({});
    const [operations, setOperations] = useState({});
    const [activities, setActivities] = useState({});
    function reflectChanges() {
        try { setDomains({ ...model.readEntry([...stack, 'domains']) } || {}); }
        catch (error) { setDomains([]); }
        try { setOperations({ ...model.readEntry([...stack, 'operations']) } || {}); }
        catch (error) { setOperations([]); }
        try { setActivities({ ...model.readEntry([...stack, 'activities']) } || {}); }
        catch (error) { setActivities([]); }
    }

    const contextData = {
        data, setData, model,
        insertData: (typ, newData) => addData(stack, setData, newData, typ),
        removeData: (typ, item) => popAvalue(stack, setData, typ, item),
        stack, setStack,
        insertInStack: (typ, item) => addItem(setStack, typ, item),
        removeFromStack: (index) => removeItem(setStack, index),
        selected, setSelected,
        reflectChanges, domains, operations, activities
    }

    return (
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}
