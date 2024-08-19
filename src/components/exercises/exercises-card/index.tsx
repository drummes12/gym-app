import type { Exercises } from '@/types/GymTracker'

export function ExercisesCard({ exercise }: { exercise: Exercises }) {
  if (exercise == null) return null
  const {
    title,
    variation,
    sets,
    repetitions,
    weight,
    weight_unit: weightUnit,
    additional_info: additionalInfo
  } = exercise

  return (
    <li className='link-card'>
      <a className='w-full' href={`/exercises/${exercise.id}`}>
        <header className='flex gap-2 items-center justify-between'>
          <h3 className='text-l text-left mr-1 font-semibold text-xl'>
            {title}
          </h3>
          {variation && (
            <h4 className='text-r text-right font-medium opacity-70'>
              {variation}
            </h4>
          )}
        </header>

        <div className='flex gap-2 items-center justify-between text-sm'>
          <p className='text-l'>
            {sets && `${sets}x`}
            {repetitions}
          </p>
          <span className='text-r opacity-90'>
            {weight && `${weight} ${weightUnit}`}
          </span>
        </div>
        {additionalInfo && (
          <p className='text-l text-left text-xs opacity-90'>
            {additionalInfo}
          </p>
        )}
      </a>
    </li>
  )
}
