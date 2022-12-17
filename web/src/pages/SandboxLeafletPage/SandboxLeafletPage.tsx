import { PlusIcon } from '@heroicons/react/20/solid'
import { LatLng } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { MetaTags } from '@redwoodjs/web'

/**
 * A helper function that can be used to parse location data into react-leaflet
 */
export const usePosition = (props: { locationData: string }) => {
  return {
    position: JSON.parse(props.locationData),
  } as { position: LatLng }
}

const SandboxLeafletPage = () => {
  const { position } = usePosition({
    locationData: '{ "lat": 32.8790061, "lng": -111.7144438 }',
  })

  const stats = [
    { name: 'LNG', stat: position.lng },
    { name: 'LAT', stat: position.lat },
  ]

  return (
    <>
      <MetaTags title="SandboxLeaflet" description="SandboxLeaflet page" />
      <div className="px-6 mt-5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Sandbox Leaflet Examples
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <MapContainer
              center={position}
              zoom={30}
              scrollWheelZoom={false}
              className="rounded shadow-lg h-96"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="relative mt-5">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon
                className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Stats</h3>
          <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.name}
                className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}

export default SandboxLeafletPage
