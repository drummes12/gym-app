import { Close } from '@/icons/close'
import { useTrainingStore } from '@/store/trainingStore'

export function ExerciseInfo() {
  const { isExerciseInfoVisible, exerciseInfo, hideExerciseInfo } =
    useTrainingStore()

  if (exerciseInfo == null) return null

  const {
    id,
    title,
    sets,
    variation,
    additional_info: additionalInfo,
    weight_unit: weightUnit
  } = exerciseInfo

  return (
    <aside
      className={`
      absolute flex flex-col rounded-lg top-0 right-0 h-full max-w-96 w-full bg-black/90 z-50 backdrop-blur-sm
      ${isExerciseInfoVisible ? '' : 'hidden'}
      `}
    >
      <header className='flex justify-between items-start p-4 font-bold overflow-hidden'>
        <h2 className='text-5xl sm:text-6xl max-w-[20ch] uppercase text-left'>
          {title}
        </h2>
        <button
          className='p-2 rounded-full hover:bg-white/5 active:scale-105'
          onClick={hideExerciseInfo}
        >
          <Close className='size-12' />
        </button>
      </header>
      <section className='p-4 w-full h-full'>
        <div className='flex flex-col gap-2 justify-center items-center my-6'>
          {variation && (
            <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
              <span className='inline-block flex-1 text-right leading-none'>
                {variation}
              </span>
              <span className='inline-block flex-1 uppercase opacity-60 text-xs'>
                Variation
              </span>
            </p>
          )}
          {additionalInfo && (
            <p className='w-full flex items-center justify-center gap-2 text-xl font-semibold'>
              <span className='inline-block flex-1 text-right leading-none'>
                {additionalInfo}
              </span>
              <span className='inline-block flex-1 uppercase opacity-60 text-xs'>
                Info
              </span>
            </p>
          )}
        </div>
        <form>
          {sets.map(({ reps, weight }, key) => (
            <fieldset key={key}>
              <label htmlFor={`${id}-reps`}>Reps:</label>
              <input
                id={`${id}-reps`}
                type='number'
                name={`${id}-reps`}
                value={reps}
              />

              <label htmlFor={`${id}-weight`}>Weight:</label>
              <input
                id={`${id}-weight`}
                type='number'
                name={`${id}-weight`}
                value={weight}
              />

              <span>{weightUnit}</span>
            </fieldset>
          ))}
        </form>
      </section>
    </aside>
  )
}
