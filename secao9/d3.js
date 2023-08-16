const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
  ]);
  //1
  const events=new Set([...gameEvents.values()])
  console.log(events)

  //2
  gameEvents.delete(64)

  //3
  const avg=90/[...gameEvents.values()].length
  console.log(`Um evento ocorreu em media a cada ${avg} minutos`)

  //4
  for(const[t,value]of gameEvents){
    t<45?console.log(`[Primeira metade] ${t}: ${value}`):console.log(`[Segunda metade] ${t}: ${value}`)
  }