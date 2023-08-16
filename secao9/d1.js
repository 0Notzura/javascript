"use strict"
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };

  /* const [players1,players2]=game.players;
  const [goalkp,...filders]=players1;
  const allplayers=[...players1,players2];
  const players1final=[...players1,'thiago','coutinho','perisic'];
  const {team1,x:draw,team2}=game.odds;

  function printgoals([...names]){
    for (let i = 0; i < names.length; i++) {
        console.log(names[i]);  
    }
    console.log(`${names.length} goals were scored`)
  }
  //1
  console.log("1: ")
  console.log(players1)
  console.log(players2)
  //2
  console.log("2: ")
  console.log(goalkp,filders)
  //3
  console.log("3: ")
  console.log(allplayers)
  //4
  console.log("4: ")
  console.log(players1final)
  //5
  console.log("5:")
  console.log(team1,draw,team2)




  //6
  printgoals(game.scored)
  //7
  team1<team2 && console.log("team 2 will probably win")
  team1>team2 && console.log("team 1 will probably win")

 */
//DESAFIO 2
//1
for(const [i,name]of game.scored.entries()){
  console.log(`Gol ${i}:${name}`)
}
//2
let avg=0
for(const value of Object.values(game.odds)){
  avg+=value
}
 avg=avg/(Object.keys(game.odds).length)
console.log(`Média das chances ${avg}`)
//3
for(const [namee,score] of Object.entries(game.odds)){
  game[namee]?console.log(`Chances de ${game[namee]} ganhar: ${score}`):console.log(`Chances de empatar: ${score}`)
}
//bonus
const scorers={}
for(const nname of Object.values(game.scored)){
   scorers[nname]?scorers[nname]++ :(scorers[nname]=1); 
  
}

//d3

