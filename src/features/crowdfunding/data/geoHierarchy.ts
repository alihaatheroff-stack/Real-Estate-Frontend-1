export type GeoCounty = { name: string; cities: string[] }
export type GeoRegion = { name: string; counties: GeoCounty[] }
export type GeoState = { name: string; regions: GeoRegion[] }

function area(name: string, counties: GeoCounty[]): GeoRegion {
  return { name, counties }
}

function county(name: string, cities: string[] = [name]): GeoCounty {
  return { name, cities }
}

function state(name: string, regions: GeoRegion[]): GeoState {
  return { name, regions }
}

function capitalState(name: string, capital: string): GeoState {
  return state(name, [area('Central', [county(capital)])])
}

export const STATES_BY_COUNTRY: Record<string, GeoState[]> = {
  Mexico: [
    capitalState('Aguascalientes', 'Aguascalientes'),
    state('Baja California', [
      area('Norte', [county('Tijuana'), county('Mexicali'), county('Ensenada', ['Ensenada', 'Rosarito'])]),
    ]),
    state('Baja California Sur', [
      area('Sur', [county('Los Cabos', ['Cabo San Lucas', 'San José del Cabo']), county('La Paz')]),
    ]),
    capitalState('Campeche', 'Campeche'),
    capitalState('Chiapas', 'Tuxtla Gutiérrez'),
    capitalState('Chihuahua', 'Chihuahua'),
    capitalState('Coahuila', 'Saltillo'),
    capitalState('Colima', 'Colima'),
    capitalState('Durango', 'Durango'),
    state('Guanajuato', [
      area('Bajío', [
        county('León'),
        county('San Miguel de Allende'),
        county('Guanajuato'),
        county('Irapuato'),
      ]),
    ]),
    state('Guerrero', [
      area('Costa', [county('Acapulco'), county('Zihuatanejo', ['Zihuatanejo', 'Ixtapa'])]),
    ]),
    capitalState('Hidalgo', 'Pachuca'),
    state('Jalisco', [
      area('Centro', [county('Guadalajara'), county('Zapopan'), county('Tlaquepaque')]),
      area('Costa Norte', [county('Puerto Vallarta')]),
      area('Ciénega', [county('Chapala')]),
    ]),
    state('Mexico City', [
      area('Centro', [county('Cuauhtémoc', ['Mexico City'])]),
      area('Poniente', [county('Miguel Hidalgo', ['Mexico City']), county('Álvaro Obregón', ['Mexico City'])]),
      area('Sur', [county('Coyoacán', ['Mexico City']), county('Tlalpan', ['Mexico City'])]),
    ]),
    state('México', [
      area('Valle de México', [county('Toluca'), county('Naucalpan'), county('Ecatepec')]),
    ]),
    capitalState('Michoacán', 'Morelia'),
    state('Morelos', [
      area('Centro', [county('Cuernavaca'), county('Jiutepec'), county('Temixco')]),
    ]),
    capitalState('Nayarit', 'Tepic'),
    state('Nuevo León', [
      area('Área Metropolitana', [county('Monterrey'), county('San Pedro Garza García'), county('Guadalupe')]),
    ]),
    state('Oaxaca', [
      area('Valles Centrales', [county('Oaxaca')]),
      area('Costa', [county('Santa Cruz Huatulco', ['Huatulco']), county('San Pedro Mixtepec', ['Puerto Escondido'])]),
    ]),
    state('Puebla', [area('Centro', [county('Puebla'), county('San Andrés Cholula', ['Cholula'])])]),
    state('Querétaro', [area('Centro', [county('Querétaro'), county('El Marqués')])]),
    state('Quintana Roo', [
      area('Norte', [county('Benito Juárez', ['Cancún']), county('Isla Mujeres')]),
      area('Riviera Maya', [county('Solidaridad', ['Playa del Carmen']), county('Tulum')]),
    ]),
    capitalState('San Luis Potosí', 'San Luis Potosí'),
    capitalState('Sinaloa', 'Culiacán'),
    capitalState('Sonora', 'Hermosillo'),
    capitalState('Tabasco', 'Villahermosa'),
    capitalState('Tamaulipas', 'Ciudad Victoria'),
    capitalState('Tlaxcala', 'Tlaxcala'),
    state('Veracruz', [area('Costa', [county('Veracruz'), county('Xalapa'), county('Coatzacoalcos')])]),
    state('Yucatán', [area('Norte', [county('Mérida'), county('Progreso')])]),
    capitalState('Zacatecas', 'Zacatecas'),
  ],
  'United States': [
    capitalState('Alabama', 'Montgomery'),
    capitalState('Alaska', 'Juneau'),
    state('Arizona', [
      area('Central', [county('Maricopa', ['Phoenix', 'Scottsdale', 'Mesa'])]),
      area('South', [county('Pima', ['Tucson'])]),
    ]),
    capitalState('Arkansas', 'Little Rock'),
    state('California', [
      area('Southern California', [
        county('Los Angeles', ['Los Angeles', 'Long Beach', 'Pasadena']),
        county('Orange', ['Irvine', 'Anaheim', 'Santa Ana']),
        county('San Diego', ['San Diego']),
        county('Riverside', ['Riverside']),
      ]),
      area('Northern California', [
        county('San Francisco', ['San Francisco']),
        county('Alameda', ['Oakland']),
        county('Santa Clara', ['San Jose']),
      ]),
    ]),
    capitalState('Colorado', 'Denver'),
    capitalState('Connecticut', 'Hartford'),
    capitalState('Delaware', 'Dover'),
    state('Florida', [
      area('South Florida', [
        county('Miami-Dade', ['Miami']),
        county('Broward', ['Fort Lauderdale']),
        county('Palm Beach', ['West Palm Beach']),
      ]),
      area('Central Florida', [county('Orange', ['Orlando'])]),
    ]),
    capitalState('Georgia', 'Atlanta'),
    capitalState('Hawaii', 'Honolulu'),
    capitalState('Idaho', 'Boise'),
    capitalState('Illinois', 'Springfield'),
    capitalState('Indiana', 'Indianapolis'),
    capitalState('Iowa', 'Des Moines'),
    capitalState('Kansas', 'Topeka'),
    capitalState('Kentucky', 'Frankfort'),
    capitalState('Louisiana', 'Baton Rouge'),
    capitalState('Maine', 'Augusta'),
    capitalState('Maryland', 'Annapolis'),
    capitalState('Massachusetts', 'Boston'),
    capitalState('Michigan', 'Lansing'),
    capitalState('Minnesota', 'Saint Paul'),
    capitalState('Mississippi', 'Jackson'),
    capitalState('Missouri', 'Jefferson City'),
    capitalState('Montana', 'Helena'),
    capitalState('Nebraska', 'Lincoln'),
    capitalState('Nevada', 'Carson City'),
    capitalState('New Hampshire', 'Concord'),
    capitalState('New Jersey', 'Trenton'),
    capitalState('New Mexico', 'Santa Fe'),
    state('New York', [
      area('Downstate', [
        county('New York', ['New York']),
        county('Kings', ['Brooklyn']),
        county('Queens', ['Queens']),
      ]),
      area('Upstate', [county('Albany', ['Albany']), county('Erie', ['Buffalo'])]),
    ]),
    capitalState('North Carolina', 'Raleigh'),
    capitalState('North Dakota', 'Bismarck'),
    capitalState('Ohio', 'Columbus'),
    capitalState('Oklahoma', 'Oklahoma City'),
    capitalState('Oregon', 'Salem'),
    capitalState('Pennsylvania', 'Harrisburg'),
    capitalState('Rhode Island', 'Providence'),
    capitalState('South Carolina', 'Columbia'),
    capitalState('South Dakota', 'Pierre'),
    capitalState('Tennessee', 'Nashville'),
    state('Texas', [
      area('Gulf Coast', [county('Harris', ['Houston'])]),
      area('North Texas', [county('Dallas', ['Dallas']), county('Tarrant', ['Fort Worth'])]),
      area('Central Texas', [county('Travis', ['Austin'])]),
      area('South Texas', [county('Bexar', ['San Antonio'])]),
    ]),
    capitalState('Utah', 'Salt Lake City'),
    capitalState('Vermont', 'Montpelier'),
    capitalState('Virginia', 'Richmond'),
    capitalState('Washington', 'Olympia'),
    capitalState('West Virginia', 'Charleston'),
    capitalState('Wisconsin', 'Madison'),
    capitalState('Wyoming', 'Cheyenne'),
  ],
  Canada: [
    capitalState('Alberta', 'Edmonton'),
    capitalState('British Columbia', 'Victoria'),
    capitalState('Manitoba', 'Winnipeg'),
    capitalState('New Brunswick', 'Fredericton'),
    capitalState('Newfoundland and Labrador', 'St. John\'s'),
    capitalState('Northwest Territories', 'Yellowknife'),
    capitalState('Nova Scotia', 'Halifax'),
    capitalState('Nunavut', 'Iqaluit'),
    state('Ontario', [
      area('Greater Toronto', [county('Toronto', ['Toronto']), county('Peel', ['Mississauga'])]),
      area('East', [county('Ottawa', ['Ottawa'])]),
    ]),
    capitalState('Prince Edward Island', 'Charlottetown'),
    state('Quebec', [
      area('South', [county('Montreal', ['Montreal'])]),
      area('Capitale-Nationale', [county('Quebec', ['Quebec City'])]),
    ]),
    capitalState('Saskatchewan', 'Regina'),
    capitalState('Yukon', 'Whitehorse'),
  ],
  Belize: [capitalState('Belize District', 'Belize City')],
  'Costa Rica': [capitalState('San José', 'San José')],
  'El Salvador': [capitalState('San Salvador', 'San Salvador')],
  Guatemala: [capitalState('Guatemala', 'Guatemala City')],
  Honduras: [capitalState('Francisco Morazán', 'Tegucigalpa')],
  Nicaragua: [capitalState('Managua', 'Managua')],
  Panama: [capitalState('Panamá', 'Panama City')],
  'Antigua and Barbuda': [capitalState('Saint John', 'Saint John\'s')],
  Bahamas: [capitalState('New Providence', 'Nassau')],
  Barbados: [capitalState('Saint Michael', 'Bridgetown')],
  Cuba: [capitalState('La Habana', 'Havana')],
  Dominica: [capitalState('Saint George', 'Roseau')],
  'Dominican Republic': [capitalState('Nacional', 'Santo Domingo')],
  Grenada: [capitalState('Saint George', 'St. George\'s')],
  Haiti: [capitalState('Ouest', 'Port-au-Prince')],
  Jamaica: [capitalState('Kingston', 'Kingston')],
  'Puerto Rico': [capitalState('San Juan', 'San Juan')],
  'Saint Kitts and Nevis': [capitalState('Saint George Basseterre', 'Basseterre')],
  'Saint Lucia': [capitalState('Castries', 'Castries')],
  'Saint Vincent and the Grenadines': [capitalState('Saint George', 'Kingstown')],
  'Trinidad and Tobago': [capitalState('Port of Spain', 'Port of Spain')],
}

export function groupLabelsByLetter(labels: string[]): Record<string, string[]> {
  return [...labels]
    .sort((a, b) => a.localeCompare(b))
    .reduce<Record<string, string[]>>((groups, label) => {
      const letter = label.trim().charAt(0).toUpperCase() || '#'
      ;(groups[letter] ??= []).push(label)
      return groups
    }, {})
}

function selectedCountries(countries: string[]) {
  return countries.filter((item) => item && item !== 'all')
}

function statesIn(countries: string[]) {
  return selectedCountries(countries).flatMap((country) => STATES_BY_COUNTRY[country] ?? [])
}

export function getCountryStates(country: string) {
  return STATES_BY_COUNTRY[country] ?? []
}

export function getStatesForCountries(countries: string[]) {
  return [...new Set(statesIn(countries).map((item) => item.name))]
}

export function pruneGeoSelection(selection: {
  countries: string[]
  states: string[]
  regions: string[]
  counties: string[]
  cities: string[]
}) {
  const countries = selection.countries.filter((item) => item && item !== 'all')
  const validStates = new Set(getStatesForCountries(countries))
  const states = selection.states.filter((item) => validStates.has(item))
  const validRegions = new Set(getRegionsForStates(countries, states))
  const regions = selection.regions.filter((item) => validRegions.has(item))
  const validCounties = new Set(getCountiesForRegions(countries, states, regions))
  const counties = selection.counties.filter((item) => validCounties.has(item))
  const validCities = new Set(getCitiesForCounties(countries, states, regions, counties))
  const cities = selection.cities.filter((item) => validCities.has(item))
  return { countries, states, regions, counties, cities }
}

export function getRegionsForStates(countries: string[], states: string[]) {
  const wanted = new Set(states.filter((item) => item !== 'all'))
  if (wanted.size === 0) return []
  return [
    ...new Set(
      statesIn(countries)
        .filter((item) => wanted.has(item.name))
        .flatMap((item) => item.regions.map((region) => region.name)),
    ),
  ]
}

export function getCountiesForRegions(countries: string[], states: string[], regions: string[]) {
  const wantedStates = new Set(states.filter((item) => item !== 'all'))
  const wantedRegions = new Set(regions.filter((item) => item !== 'all'))
  if (wantedStates.size === 0 || wantedRegions.size === 0) return []
  return [
    ...new Set(
      statesIn(countries)
        .filter((item) => wantedStates.has(item.name))
        .flatMap((item) => item.regions)
        .filter((item) => wantedRegions.has(item.name))
        .flatMap((item) => item.counties.map((entry) => entry.name)),
    ),
  ]
}

export function getCitiesForCounties(
  countries: string[],
  states: string[],
  regions: string[],
  counties: string[],
) {
  const wantedStates = new Set(states.filter((item) => item !== 'all'))
  const wantedRegions = new Set(regions.filter((item) => item !== 'all'))
  const wantedCounties = new Set(counties.filter((item) => item !== 'all'))
  if (wantedStates.size === 0 || wantedRegions.size === 0 || wantedCounties.size === 0) return []
  return [
    ...new Set(
      statesIn(countries)
        .filter((item) => wantedStates.has(item.name))
        .flatMap((item) => item.regions)
        .filter((item) => wantedRegions.has(item.name))
        .flatMap((item) => item.counties)
        .filter((item) => wantedCounties.has(item.name))
        .flatMap((item) => item.cities),
    ),
  ]
}

export function impliedCitiesForSelection({
  countries,
  states,
  regions,
  counties,
  cities,
}: {
  countries: string[]
  states: string[]
  regions: string[]
  counties: string[]
  cities: string[]
}) {
  const pickedCities = cities.filter((item) => item && item !== 'all')
  if (pickedCities.length) return pickedCities

  const pickedCounties = counties.filter((item) => item && item !== 'all')
  if (pickedCounties.length) return getCitiesForCounties(countries, states, regions, pickedCounties)

  const pickedRegions = regions.filter((item) => item && item !== 'all')
  if (pickedRegions.length) {
    return [
      ...new Set(
        statesIn(countries)
          .filter((item) => states.includes(item.name))
          .flatMap((item) => item.regions)
          .filter((item) => pickedRegions.includes(item.name))
          .flatMap((item) => item.counties.flatMap((entry) => entry.cities)),
      ),
    ]
  }

  const pickedStates = states.filter((item) => item && item !== 'all')
  if (pickedStates.length) {
    return [
      ...new Set(
        statesIn(countries)
          .filter((item) => pickedStates.includes(item.name))
          .flatMap((item) => item.regions.flatMap((region) => region.counties.flatMap((entry) => entry.cities))),
      ),
    ]
  }

  return []
}
