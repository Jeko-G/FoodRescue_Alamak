import { useEffect, useRef } from 'react';
import L from 'leaflet';

function MapView({ donations, userPos }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (mapRef.current) return;

    const map = L.map(containerRef.current).setView([3.5952, 98.6722], 12);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    return () => {
      isMountedRef.current = false;
      try { map.remove(); } catch (e) {}
      mapRef.current = null;
    };
  }, []);

  // Update posisi user di peta kalau userPos berubah
  useEffect(() => {
    if (!mapRef.current || !userPos) return;

    try {
      // Hapus marker user lama
      if (userMarkerRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current);
      }

      const userLatLng = [userPos.lat, userPos.lng];
      mapRef.current.setView(userLatLng, 13);

      userMarkerRef.current = L.marker(userLatLng, {
        icon: L.divIcon({
          html: '📍',
          className: '',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        })
      }).addTo(mapRef.current).bindPopup('Lokasi Kamu');
    } catch (e) {}
  }, [userPos]);

  // Update marker donasi
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(m => {
      try { mapRef.current.removeLayer(m); } catch (e) {}
    });
    markersRef.current = [];

    donations.forEach(d => {
      const coords = d.pickup_location?.coordinates;
      if (!coords || (coords[0] === 0 && coords[1] === 0)) return;

      try {
        const marker = L.marker([coords[1], coords[0]])
          .addTo(mapRef.current)
          .bindPopup(`
            <div style="min-width:150px">
              <strong>${d.category_id?.icon_emoji || '🍱'} ${d.title}</strong><br/>
              <small>${d.pickup_city}</small><br/>
              <small>${d.quantity_remaining} ${d.quantity_unit} tersisa</small><br/>
              <a href="/donations/${d._id}" style="color:#0d6efd">Lihat Detail →</a>
            </div>
          `);
        markersRef.current.push(marker);
      } catch (e) {}
    });
  }, [donations]);

  return (
    <div ref={containerRef} style={{ height: '400px', borderRadius: '8px', zIndex: 0 }}></div>
  );
};

export default MapView;