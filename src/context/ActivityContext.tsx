import { createContext, useMemo, useReducer, type ActionDispatch, type ReactNode } from "react"
import { activityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activity-reducer";
import type { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: ActionDispatch<[actions: ActivityActions]>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number,
    categoryName: (category: Activity["category"]) => string[]
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({children} : ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState);

    const caloriesConsumed = useMemo(() => {
        return state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0)
    }, [state.activities]);

    const caloriesBurned = useMemo(() => {
        return state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0)
    }, [state.activities]);

    const netCalories = useMemo(() => {
        return caloriesConsumed - caloriesBurned
    }, [state.activities])

    const categoryName = useMemo(() => (category: Activity['category']) => {
        return categories.map(cat => (
            cat.id === category ? cat.name : ''
        ))
    }, []);

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities]);

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}

        </ActivityContext.Provider>
    )
}

