import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Home as HomeIcon, 
  Briefcase, 
  MapPin, 
  Building2, 
  Star, 
  Share2, 
  ChevronRight,
  Plus,
  Minus,
  Navigation,
  ArrowRight,
  Layers
} from 'lucide-react';
import { cityUniversities } from '../constants/universities';

export default function UniversityMap() {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [activeCity, setActiveCity] = useState('All');

  const cityList = ['All', 'Beijing', 'Shanghai', 'Hangzhou', 'Guangzhou', 'Nanjing', 'Shenzhen'];

  const allUniversities = cityUniversities.flatMap(city => 
    city.universities.map(u => ({ city, university: u }))
  ).sort((a, b) => a.university.name.localeCompare(b.university.name));

  const filteredUniversities = allUniversities.filter(item => {
    const matchesCity = activeCity === 'All' || item.city.name === activeCity;
    const matchesSearch = item.university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.city.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Initialize Leaflet
    leafletMap.current = L.map(mapRef.current, {
      center: [30.2741, 120.1551],
      zoom: 6,
      zoomControl: false,
    });

    // Layer 1: Esri Satellite
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
    }).addTo(leafletMap.current);

    // Layer 2: Borders and Labels Overlay
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      zIndex: 10
    }).addTo(leafletMap.current);

    markerGroupRef.current = L.layerGroup().addTo(leafletMap.current);
    updateMarkers(allUniversities);

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  const updateMarkers = (universities: any[]) => {
    if (!leafletMap.current || !markerGroupRef.current) return;
    
    markerGroupRef.current.clearLayers();
    
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg pulse-marker"></div>`,
      iconSize: [16, 16]
    });

    universities.forEach(item => {
      const coords: [number, number] = [item.university.coordinates[1], item.university.coordinates[0]];
      L.marker(coords, { icon: markerIcon })
        .addTo(markerGroupRef.current!)
        .on('click', () => {
          setSelectedUniversity(item);
          leafletMap.current?.flyTo(coords, 14, { duration: 1.5 });
        });
    });
  };

  useEffect(() => {
    updateMarkers(filteredUniversities);
    
    if (activeCity !== 'All' && leafletMap.current) {
      const cityData = cityUniversities.find(c => c.name === activeCity);
      if (cityData) {
        const coords: [number, number] = [cityData.coordinates[1], cityData.coordinates[0]];
        leafletMap.current.flyTo(coords, 10, { duration: 1.5 });
      }
    }
  }, [activeCity, searchQuery]);

  const resetView = () => {
    setActiveCity('All');
    setSearchQuery('');
    leafletMap.current?.flyTo([30.2741, 120.1551], 6, { duration: 1.5 });
    setSelectedUniversity(null);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black font-sans">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .leaflet-container { background: #000; }
        .pulse-marker { animation: marker-pulse 2s infinite; }
        @keyframes marker-pulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Map Background */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Sidebar - Dark Glassmorphism */}
      <aside className="absolute top-5 left-5 bottom-5 w-[380px] z-10 bg-[#1c1c1e]/65 backdrop-blur-[25px] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[24px] text-white flex flex-col overflow-hidden hidden md:flex">
        
        {/* Header & Search */}
        <div className="p-6 pb-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Campus Explorer</h3>
            <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
              <Layers className="w-4 h-4 text-white/60" />
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-black/40 rounded-full flex items-center px-4 py-3 focus-within:ring-1 ring-blue-500/50 transition-all">
              <Search className="w-4 h-4 text-white/20 mr-3" />
              <input 
                type="text" 
                placeholder="Search Institutions..."
                className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <X className="w-4 h-4 text-white/20 cursor-pointer" onClick={() => setSearchQuery('')} />}
            </div>
          </div>

          {/* City Filter Pills */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
            {cityList.map(city => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCity === city 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic University List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-2 space-y-3">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Top Ranked Institutions</span>
            <span className="text-[10px] font-black text-blue-400">{filteredUniversities.length} FOUND</span>
          </div>
          
          {filteredUniversities.map((item, i) => (
            <motion.button
              layout
              key={`${item.university.name}-${i}`}
              onClick={() => {
                setSelectedUniversity(item);
                const coords: [number, number] = [item.university.coordinates[1], item.university.coordinates[0]];
                leafletMap.current?.flyTo(coords, 14, { duration: 1.5 });
              }}
              className={`w-full p-4 text-left rounded-2xl border transition-all duration-300 group ${
                selectedUniversity?.university.name === item.university.name 
                ? 'bg-blue-600/20 border-blue-500/50 shadow-xl' 
                : 'bg-white/5 border-transparent hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  selectedUniversity?.university.name === item.university.name ? 'bg-blue-600' : 'bg-white/5'
                }`}>
                  <span className="text-xs font-black text-white">#{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-bold text-white leading-tight truncate uppercase tracking-tight">
                    {item.university.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-white/60" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.city.name}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all ${
                  selectedUniversity?.university.name === item.university.name ? 'text-white opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'
                }`} />
              </div>
            </motion.button>
          ))}

          {filteredUniversities.length === 0 && (
            <div className="py-20 text-center">
              <Building2 className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-white/40 font-black uppercase text-[10px] tracking-widest">No Institutions Match Your Query</p>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <button 
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all shadow-xl group"
          >
            <Share2 className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Share Location</span>
          </button>
        </div>
      </aside>

      {/* Floating Map Controls */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col gap-3">
        <div className="flex flex-col bg-[#1c1c1e]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <button 
            onClick={() => leafletMap.current?.zoomIn()}
            className="p-4 hover:bg-white/10 text-white transition-all border-b border-white/10"
          >
            <Plus className="w-6 h-6" />
          </button>
          <button 
            onClick={() => leafletMap.current?.zoomOut()}
            className="p-4 hover:bg-white/10 text-white transition-all"
          >
            <Minus className="w-6 h-6" />
          </button>
        </div>
        <button 
          onClick={resetView}
          className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-500 transition-all shadow-2xl"
        >
          <Navigation className="w-6 h-6" />
        </button>
      </div>

      {/* Selected University Tablet-style Popup */}
      <AnimatePresence>
        {selectedUniversity && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-[410px] md:translate-x-0 z-40 bg-[#1c1c1e]/90 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-2xl p-8 w-[340px] text-white"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 pr-4">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 block">Institution Spotlight</span>
                <h4 className="text-2xl font-black uppercase leading-tight tracking-tighter text-white">
                  {selectedUniversity.university.name}
                </h4>
              </div>
              <button onClick={() => setSelectedUniversity(null)} className="p-2.5 hover:bg-white/10 rounded-2xl transition-all text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/5">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1.5">Locality</p>
                  <p className="text-sm font-bold text-white uppercase tracking-tight">{selectedUniversity.city.name}, CHINA</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/university/${selectedUniversity.university.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-xl group overflow-hidden relative"
            >
              <span className="relative z-10">Launch Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
