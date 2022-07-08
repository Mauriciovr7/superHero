// no usar jQuery

// vars html
const heroe = document.getElementById('hero')
const form = document.querySelector('.formu')
const imagen = document.querySelector('#resultado')
const grafico = document.querySelector('#chartContainer')

async function get_hero(hero) {
  const datos = await fetch(`https://superheroapi.com/api.php/${clave}/${hero}`)
  const heroe = await datos.json() // desempaquetar // pendiente
  console.log(heroe)
  
  let inteligencia = heroe.powerstats.intelligence
  inteligencia == 'null' ? inteligencia = 0 : null
  let fuerza = heroe.powerstats.strength
  fuerza == 'null' ? fuerza = 0 : null
  let vel = heroe.powerstats.speed
  vel == 'null' ? vel = 0 : null
  let dura = heroe.powerstats.durability
  dura == 'null' ? dura = 0 : null
  let poder = heroe.powerstats.power
  poder == 'null' ? poder = 0 : null
  let comb = heroe.powerstats.combat
  comb == 'null' ? comb = 0 : null

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "light2",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: `Estadísticas para ${heroe.name}`,
      fontSize: 30
    },
    data: [{
      type: "pie",
      startAngle: 25,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: inteligencia, label: "intelligence" },
          { y: fuerza, label: "strength" },
          { y: vel, label: "speed" },
          { y: dura, label: "durability" },
          { y: poder, label: "power" },
          { y: comb, label: "combat" },
      ]
    }]
  });
  
  chart.render();
  imagen.innerHTML = `
    <h3 class="text-center">SuperHero encontrado</h3>
    <div class="card h-52">
    <div class="row no-gutters">
        <div class="col-md-4">
        <img src="${heroe.image.url}" class="card-img" alt=" __sin foto">
        </div>
        <div class="col-md-8">
            <div class="card-body" style="font-size:12px;">
                <h5 class="card-title">Nombre: ${heroe.name}</h5>                            
                <p class="card-text">Conexiones: ${heroe.connections["group-affiliation"]}</p>                                                                           
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><em><small>Publicado por: </em>${heroe.biography.publisher}</small></li>
                    <li class="list-group-item"><em>Ocupación: </em>${heroe.work.occupation}</li>
                    <li class="list-group-item"><em>Primera Aparición: </em>${heroe.biography["first-appearance"]}</li>
                    <li class="list-group-item"><em>Altura: </em>${heroe.appearance.height.join(" - ")}.</li>
                    <li class="list-group-item"><em>Peso: </em>${heroe.appearance.weight.join(" - ")}.</li>
                    <li class="list-group-item"><em>Alianzas: </em>${heroe.biography.aliases.join(" ")}</li>
                </ul>
            </div>
        </div>
    </div>
    </div>`
}

form.addEventListener('submit', function (ev) {
  ev.preventDefault()
  console.log('formu', heroe.value)
  get_hero(heroe.value)
})