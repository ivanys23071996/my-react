import React, {useReducer} from 'react';
import {useForm} from "react-hook-form";

import './Cat_Dog.css';
import Cat from "../Cat/Cat";
import Dog from "../Dog/Dog";

const ADD = "ADD";
const ADD_DOG = "ADD_DOG";

const reducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return {...state, cat: [...state.cat, action.payload]}
        case ADD_DOG:
            return {...state, dog: [...state.dog, action.payload]}
        case "delete":
            return {...state, cat: state.cat.filter(c => c.id !== action.payload)}
        case "Delete":
            return {...state, dog: state.dog.filter(d => d.id !== action.payload)}
        default:
            return {...state}
    }
}

const CatDog = () => {
    const {register, handleSubmit} = useForm({});
    const [state, dispatch] = useReducer(reducer, {cat: [], dog: []});
    console.log(state);
    const submit = async (data) => {
        const obj = {cat: data.cat, id: Math.round(Math.random() * 1000)}
        dispatch({type: ADD, payload: obj})
    }

    const submitDog = async (data) => {
        dispatch({type: ADD_DOG, payload: {dog: data.dog, id: Math.round(Math.random() * 1000)}})
        console.log(data.dog)
    }


    return (
        <>
            <div className={'FormBlock'}>
                <form onSubmit={handleSubmit(submit)}>
                    Input Cat:
                    <input type="text" defaultValue={''} {...register('cat')}/>
                    <button>Cat</button>
                </form>
                <form onSubmit={handleSubmit(submitDog)}>
                    Input Dog:
                    <input type="text" defaultValue={''} {...register('dog')}/>
                    <button>Dog</button>
                </form>
            </div>
            <hr/>
            <div className={'Animal'}>
                <div>
                    {state.cat && state.cat.map(value => <Cat key={value.id} cat={value} dispatch={dispatch}/>)}
                </div>
                <div>
                    {state.dog && state.dog.map(value => <Dog key={value.id} dog={value} dispatch={dispatch}/>)}
                </div>
            </div>
        </>
    );
};


export default CatDog;