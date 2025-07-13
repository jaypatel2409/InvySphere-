import React, { useEffect, useRef } from 'react';

interface MapMarker {
  lat: number;
  lng: number;
  label: string;
}

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock data for client locations
  const clientLocations: MapMarker[] = [
    { lat: 22.3039, lng: 70.8022, label: "Rajkot Client" },
    { lat: 23.0225, lng: 72.5714, label: "Ahmedabad Client" },
    { lat: 21.1702, lng: 72.8311, label: "Surat Client" },
    { lat: 19.0760, lng: 72.8777, label: "Mumbai Client" },
    { lat: 28.7041, lng: 77.1025, label: "Delhi Client" },
    { lat: 12.9716, lng: 77.5946, label: "Bangalore Client" }
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    // Create a simple map-like visualization using CSS and HTML
    // This is a fallback implementation that works without Google Maps API
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // Create map background
    const mapBackground = document.createElement('div');
    mapBackground.className = 'w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden rounded-lg';
    mapBackground.style.backgroundImage = `
      radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
    `;

    // Add grid pattern
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'absolute inset-0 opacity-10';
    gridOverlay.style.backgroundImage = `
      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
    `;
    gridOverlay.style.backgroundSize = '20px 20px';
    mapBackground.appendChild(gridOverlay);

    // Add location markers
    clientLocations.forEach((location, index) => {
      const marker = document.createElement('div');
      marker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group';
      
      // Position markers randomly but consistently
      const x = 15 + (index * 13) % 70; // Spread across width
      const y = 20 + (index * 17) % 60; // Spread across height
      marker.style.left = `${x}%`;
      marker.style.top = `${y}%`;

      // Create marker pin
      const pin = document.createElement('div');
      pin.className = 'w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse';
      pin.style.boxShadow = '0 0 0 0 rgba(239, 68, 68, 0.7)';
      
      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap';
      tooltip.textContent = location.label;

      marker.appendChild(pin);
      marker.appendChild(tooltip);
      mapBackground.appendChild(marker);

      // Add pulse animation
      const pulseRing = document.createElement('div');
      pulseRing.className = 'absolute w-6 h-6 rounded-full border-2 border-red-500 animate-ping';
      marker.appendChild(pulseRing);
    });

    // Add legend
    const legend = document.createElement('div');
    legend.className = 'absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md';
    legend.innerHTML = `
      <div class="flex items-center text-sm font-medium text-gray-700 mb-2">
        <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
        Client Locations
      </div>
      <div class="text-xs text-gray-500">
        ${clientLocations.length} active clients
      </div>
    `;
    mapBackground.appendChild(legend);

    mapContainer.appendChild(mapBackground);
  }, []);

  return (
    <div 
      ref={mapRef}
      className="w-full h-full"
      aria-label="Interactive map showing client locations"
    />
  );
};

export default GoogleMap;