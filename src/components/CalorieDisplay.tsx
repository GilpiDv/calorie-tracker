type CalorieDisplayProps = {
    calories: number
    name: string
}

export default function CalorieDisplay({calories, name} : CalorieDisplayProps) {
  return (
    <div>
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span className="font-black text-6xl text-orange">
                {calories}
            </span>
            {name}
        </p>
    </div>
  )
}
