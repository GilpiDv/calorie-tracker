import { useEffect, type ChangeEvent, type FormEvent } from "react"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid";
import type { Activity } from "../types";
import { categories } from "../data/categories"
import { useActivity } from "../hooks/useActivity";

export default function Form() {

    const { state, dispatch } = useActivity();

    const initialActivityState : Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialActivityState);

    useEffect(() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0];

            setActivity(selectedActivity)
        } 

    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const elementId = e.target.id;
        const newValue = e.target.value;
        const isNumericField = ['category', 'calories'].includes(elementId);

        setActivity({
            ...activity,
            [elementId]: isNumericField ? +newValue : newValue
        });
    }

    const isValidActivity = () => {
        const {name, calories} = activity;
        return name.trim() !== "" && calories > 0;
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: 'save-activity', payload: {newActivity: activity}})

        // This way, every time a record is saved, a new unique id is generating for the next record.
        setActivity({
            ...initialActivityState,
            id: uuidv4()
        });
    }

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Category:</label>
                <select 
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name">Activity</label>
                <input 
                    type="text" 
                    id='name'
                    value={activity.name}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="e.g. Food: Orange Juice, Salad. Exercises: Lift-Ups, Bicycle."
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories">Calories</label>
                <input 
                    type="text" 
                    id='calories'
                    value={activity.calories}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            handleChange(e); // Only update if it's a valid number
                        }
                    }}
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="e.g. 300, 550..."
                    onPaste={(e) => e.preventDefault()}
                    onDrop={(e) => e.preventDefault()}
                />
            </div>

            <input 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold text-white cursor-pointer uppercase disabled:opacity-15" 
                value={activity.category == 1 ? ' Save Food' : 'Save Exercise'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
