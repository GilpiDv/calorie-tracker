import { act } from "react"
import type { Activity } from "../types"
import { ReceiptRefundIcon } from "@heroicons/react/24/outline"

export type ActivityActions = 
{ type: 'save-activity', payload: { newActivity : Activity} } |
{ type: 'set-activeId', payload: { id : Activity['id']} } |
{ type: 'delete-activity', payload: { id : Activity['id']} } |
{ type: 'restart-app' }


export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities');

    return activities ? JSON.parse(activities) : [];
}

export const initialState : ActivityState = {
    activities: localStorageActivities(), 
    activeId: ''
}   

export const activityReducer = (
    state: ActivityState = initialState, 
    actions: ActivityActions
) => {
    if(actions.type === 'save-activity') {
        let updatedActivities : Activity[] = [];

        if(state.activeId) {
            updatedActivities = state.activities.map((activity) => {
                return activity.id === state.activeId ? actions.payload.newActivity : activity
            });
        } else {
            updatedActivities = [...state.activities, actions.payload.newActivity];
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(actions.type === 'set-activeId') {
        return {
            ...state,
            activeId: actions.payload.id
        }
    }

    if(actions.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== actions.payload.id)
        }
    }

    if(actions.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state;
}