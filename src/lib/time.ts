export function timeFormatted(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const minutesFormatted = minutes.toString().padStart(2, '0')
  const secondsFormatted = remainingSeconds.toString().padStart(2, '0')

  return { minutesFormatted, secondsFormatted }
}

export function displayFormattedTime(seconds: number) {
  const minutos = Math.floor(seconds / 60)
  const segundosRestantes = seconds % 60

  let resultado = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' }).format(
    [minutos > 0 ? `${minutos} min` : null, segundosRestantes > 0 ? `${segundosRestantes} s` : null].filter(Boolean) as string[]
  )

  return resultado
}