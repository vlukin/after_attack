const sounds = {
  select: new Audio('/sounds/select.wav'),
  win: new Audio('/sounds/win.wav'),
  lose: new Audio('/sounds/lose.wav')
};

export const playSound = (soundName: 'select' | 'win' | 'lose') => {
  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
};

export default { playSound };
