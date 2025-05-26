import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CalorieTracker() {
    const { caloriesBurned, caloriesConsumed, netCalories } = useActivity();
  
    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">
                Calorie Summary
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay 
                    calories={caloriesConsumed}
                    name={'Consumed'}
                />
                <CalorieDisplay 
                    calories={caloriesBurned}
                    name={'Burned'}
                />
                <CalorieDisplay 
                    calories={netCalories}
                    name={'Difference'}
                />
            </div>
        </>
    )
}
