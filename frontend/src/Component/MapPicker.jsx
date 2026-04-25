import { useEffect, useRef } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      { headers: { 'Accept-Language': 'id' } }
    );
    const data = await res.json();
    const addr = data.address;

    const road = addr.road || addr.pedestrian || addr.footway || addr.path || '';
    const houseNumber = addr.house_number || '';
    const suburb = addr.suburb || addr.village || addr.hamlet || addr.neighbourhood || '';
    const city = addr.city || addr.town || addr.county || addr.regency || '';

    // Format: "Jl. Sudirman No. 123, Petisah"
    let address_line = '';
    if (road) address_line += road;
    if (houseNumber) address_line += ` No. ${houseNumber}`;
    if (suburb) address_line += address_line ? `, ${suburb}` : suburb;

    return { address_line: address_line.trim(), city };
  } catch {
    return null;
  }
}

async function forwardGeocode(query) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`,
      { headers: { 'Accept-Language': 'id' } }
    );
    const data = await res.json();
    if (data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

function MapPicker({ lat, lng, onChange, onAddress, searchQuery }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const containerRef = useRef(null);
  const searchTimeout = useRef(null);
  const isReversingRef = useRef(false); // flag buat cegah loop

  const handleLocationChange = async (latlng) => {
    isReversingRef.current = true; // set flag sebelum reverse
    onChange({ lat: latlng.lat, lng: latlng.lng });
    const result = await reverseGeocode(latlng.lat, latlng.lng);
    if (result && onAddress) onAddress(result);
    // reset flag setelah 1 detik (lebih dari debounce 800ms)
    setTimeout(() => { isReversingRef.current = false; }, 1000);
  };

  // Forward geocode kalau user ngetik manual
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 5) return;
    if (isReversingRef.current) return; // skip kalau lagi reverse geocoding

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      if (isReversingRef.current) return; // double check
      const result = await forwardGeocode(searchQuery);
      if (result && mapRef.current && markerRef.current) {
        const latlng = L.latLng(result.lat, result.lng);
        markerRef.current.setLatLng(latlng);
        mapRef.current.setView(latlng, 16);
        onChange({ lat: result.lat, lng: result.lng });
      }
    }, 800);
  }, [searchQuery]);

  useEffect(() => {
    if (mapRef.current) return;

    const defaultLat = lat || 3.5952;
    const defaultLng = lng || 98.6722;

    const map = L.map(containerRef.current).setView([defaultLat, defaultLng], 13);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map);
    markerRef.current = marker;
    marker.bindPopup('📍 Lokasi pickup').openPopup();

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      handleLocationChange(pos);
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      handleLocationChange(e.latlng);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ height: '300px', borderRadius: '8px', zIndex: 0 }}></div>
      <small className="text-muted mt-1 d-block">
        <i className="bi bi-info-circle me-1"></i>
        Klik / drag marker → alamat otomatis terisi. Ketik alamat → peta otomatis bergerak.
      </small>
    </div>
  );
}

export default MapPicker;