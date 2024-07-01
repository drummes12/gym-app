export let audioContext: AudioContext
export let bufferSound: AudioBuffer

export function initAudioContext(constext: AudioContext) {
  audioContext = constext
}

export async function loadSound(url: string) {
  bufferSound = await fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
  return bufferSound
}

export function playSound() {
  const source = audioContext.createBufferSource()
  source.buffer = bufferSound
  source.connect(audioContext.destination)
  source.start(0)
}
