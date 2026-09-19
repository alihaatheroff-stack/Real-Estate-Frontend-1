import { useSyncExternalStore } from 'react'

export type MapBasemapId = 'map' | 'satellite' | 'terrain'

type BasemapLayer = {
  url: string
  attribution: string
  maxZoom: number
  opacity?: number
}

export type MapBasemapConfig = {
  id: MapBasemapId
  label: string
  layers: BasemapLayer[]
}

export const MAP_BASEMAPS: Record<MapBasemapId, MapBasemapConfig> = {
  map: {
    id: 'map',
    label: 'Map',
    layers: [
      {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      },
    ],
  },
  satellite: {
    id: 'satellite',
    label: 'Satellite',
    layers: [
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
        maxZoom: 19,
      },
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
        opacity: 0.9,
      },
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      },
    ],
  },
  terrain: {
    id: 'terrain',
    label: 'Terrain',
    layers: [
      {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attribution:
          'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS, EPA, NPS',
        maxZoom: 19,
      },
    ],
  },
}

export const MAP_BASEMAP_OPTIONS: MapBasemapId[] = ['map', 'satellite', 'terrain']

const STORAGE_KEY = 'map-basemap'
const CHANGE_EVENT = 'map-basemap-change'

function isBasemapId(value: string | null): value is MapBasemapId {
  return value === 'map' || value === 'satellite' || value === 'terrain'
}

function readStoredBasemap(): MapBasemapId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isBasemapId(stored)) return stored
  } catch {
    /* ignore */
  }
  return 'map'
}

let currentBasemap: MapBasemapId = 'map'
let hydrated = false

function readBasemap(): MapBasemapId {
  if (!hydrated) {
    currentBasemap = readStoredBasemap()
    hydrated = true
  }
  return currentBasemap
}

function emitChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export function setMapBasemap(id: MapBasemapId) {
  currentBasemap = id
  hydrated = true
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
  emitChange()
}

export function useMapBasemap() {
  return useSyncExternalStore(subscribe, readBasemap, () => 'map' as const)
}
