import React from 'react'
import { LocalStorageJSONModel } from './Context/LocalStorageJSONModel'

const model = new LocalStorageJSONModel()
export default function LSJSONTester() {
    return (
        <div>
            <div>LSJSONTester</div>
            <div onClick={() => console.log(model)}>log</div>
            <div onClick={() => {
                model.addEntry(['root', 'domains', 'attributes'], {});
                console.log('done');
            }}>add</div>

            <div onClick={() => {
                // const values = model.get_keys([])
                const values = model.readEntry([])
                console.log(values);
            }}>get</div>

            <div onClick={() => {
                const values = model.deleteEntry(['start', 'key1']);
                console.log(values);
            }}>delete</div>

            <div onClick={() => {
                const values = model.readEntry(['root', 'domains', '1719506287957']);
                const updated = { ...values, name: 'domain1' }
                model.addEntry(['root', 'domains', '1719506287957'], updated);
                console.log(values);
            }}>update</div>

        </div>
    )
}
