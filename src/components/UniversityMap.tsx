import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, Building2, Search, Plus, Minus, Navigation, ArrowRight, Train, Home, GraduationCap, Layers } from 'lucide-react';
import { cityUniversities, CityData, University } from '../constants/universities';
import { additionalLocations } from '../constants/mapLayers';

export default function UniversityMap() {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  
  const MAP_WIDTH = 800;
  const MAP_HEIGHT = 600;

  const [selectedUniversity, setSelectedUniversity] = useState<{ city: CityData, university: University } | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCity, setHoveredCity] = useState<{ name: string; count: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Layer Toggles
  const [layers, setLayers] = useState({
    universities: true,
    accommodations: true,
    transport: true
  });

  const styles = {
    water: '#A3D1FF', // Apple Map Water
    land: '#FDFDFD', // Apple Map Land
    hover: '#F2F6FF', // Soft selection
    border: '#D1D1D1', // Subtle borders
    markerUni: '#007AFF', // Apple Blue
    markerStay: '#FF9500', // Apple Orange
    markerTravel: '#5856D6', // Apple Purple
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);
    const currentTransform = d3.zoomTransform(svg.node() as Element);
    const nextK = direction === 'in' ? currentTransform.k * 1.5 : currentTransform.k / 1.5;
    svg.transition().duration(400).call(zoomRef.current.scaleTo as any, nextK);
  };

  const resetView = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(1000).call(zoomRef.current.transform, d3.zoomIdentity);
    setSelectedUniversity(null);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`)
      .attr('width', '100%')
      .attr('height', '100%');

    svg.selectAll('*').remove();

    // Background (Water)
    svg.append('rect')
      .attr('width', MAP_WIDTH)
      .attr('height', MAP_HEIGHT)
      .attr('fill', styles.water);

    const projection = d3.geoMercator()
      .center([105, 36])
      .scale(850)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
    
    projectionRef.current = projection;
    const path = d3.geoPath().projection(projection);

    d3.json('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/china.json')
      .then((data: any) => {
        setLoading(false);
        const mapGroup = svg.append('g').attr('class', 'map-content');

        const zoom = d3.zoom<SVGSVGElement, unknown>()
          .scaleExtent([1, 40])
          .on('zoom', (event) => {
            mapGroup.attr('transform', event.transform);
            setZoomLevel(event.transform.k);
            
            // Dynamic Label Visibility to prevent overlap
            mapGroup.selectAll('.point-label').attr('opacity', (d: any) => {
              if (event.transform.k > 8) return 1;
              return 0;
            });
            
            mapGroup.selectAll('.city-label').attr('opacity', (d: any) => {
              if (event.transform.k > 2 && event.transform.k <= 8) return 1;
              return 0;
            });
          });

        zoomRef.current = zoom;
        svg.call(zoom as any);

        // Land
        mapGroup.append('g')
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', styles.land)
          .attr('stroke', styles.border)
          .attr('stroke-width', 0.5)
          .on('mouseenter', function(event, d: any) {
            const cityName = d.properties.name;
            const cityData = cityUniversities.find(c => cityName.includes(c.name) || c.name.includes(cityName));
            const count = cityData ? cityData.universities.length : 0;
            
            d3.select(this).attr('fill', styles.hover);
            setHoveredCity({ name: cityName, count });
          })
          .on('mousemove', (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
          })
          .on('mouseleave', function() {
            d3.select(this).attr('fill', styles.land);
            setHoveredCity(null);
          });

        // City Labels (Low-Mid Zoom)
        const cityLabels = mapGroup.append('g').attr('class', 'city-labels-group');
        cityUniversities.forEach(city => {
          const [cx, cy] = projection(city.coordinates) || [0, 0];
          cityLabels.append('text')
            .attr('class', 'city-label')
            .attr('x', cx)
            .attr('y', cy)
            .attr('text-anchor', 'middle')
            .attr('fill', '#64748b')
            .attr('font-size', '10px')
            .attr('font-weight', '500')
            .attr('opacity', 0)
            .style('pointer-events', 'none')
            .text(city.name);
        });

        // Points of Interest Layers
        const poiGroup = mapGroup.append('g').attr('class', 'poi-layers');

        // Universities
        if (layers.universities) {
          const uniGroup = poiGroup.append('g').attr('class', 'uni-layer');
          cityUniversities.forEach(city => {
            city.universities.forEach(uni => {
              const [x, y] = projection(uni.coordinates) || [0, 0];
              const group = uniGroup.append('g').attr('transform', `translate(${x},${y})`);
              
              group.append('circle')
                .attr('r', 3.5)
                .attr('fill', styles.markerUni)
                .attr('stroke', 'white')
                .attr('stroke-width', 1.5)
                .style('cursor', 'pointer')
                .on('click', (e) => {
                  e.stopPropagation();
                  setSelectedUniversity({ city, university: uni });
                });

              group.append('text')
                .attr('class', 'point-label uni-name')
                .attr('dy', -8)
                .attr('text-anchor', 'middle')
                .attr('fill', '#1e293b')
                .attr('font-size', '7px')
                .attr('font-weight', '600')
                .attr('opacity', 0)
                .style('pointer-events', 'none')
                .text(uni.name);
            });
          });
        }

        // Accommodations
        if (layers.accommodations) {
          const stayGroup = poiGroup.append('g').attr('class', 'stay-layer');
          additionalLocations.filter(l => l.type === 'accommodation').forEach(loc => {
            const [x, y] = projection(loc.coordinates) || [0, 0];
            const group = stayGroup.append('g').attr('transform', `translate(${x},${y})`);
            
            group.append('circle')
              .attr('r', 3)
              .attr('fill', styles.markerStay)
              .attr('stroke', 'white')
              .attr('stroke-width', 1.2)
              .style('opacity', 0.9);

            group.append('text')
              .attr('class', 'point-label stay-name')
              .attr('dy', 12)
              .attr('text-anchor', 'middle')
              .attr('fill', '#9a3412')
              .attr('font-size', '6px')
              .attr('font-weight', '500')
              .attr('opacity', 0)
              .text(loc.name);
          });
        }

        // Transport
        if (layers.transport) {
          const transGroup = poiGroup.append('g').attr('class', 'transport-layer');
          additionalLocations.filter(l => l.type === 'transport').forEach(loc => {
            const [x, y] = projection(loc.coordinates) || [0, 0];
            const group = transGroup.append('g').attr('transform', `translate(${x},${y})`);
            
            group.append('rect')
              .attr('width', 5)
              .attr('height', 5)
              .attr('x', -2.5)
              .attr('y', -2.5)
              .attr('rx', 1.5)
              .attr('fill', styles.markerTravel)
              .attr('stroke', 'white')
              .attr('stroke-width', 1.2);

            group.append('text')
              .attr('class', 'point-label trans-name')
              .attr('dy', 12)
              .attr('text-anchor', 'middle')
              .attr('fill', '#3730a3')
              .attr('font-size', '6px')
              .attr('font-weight', '500')
              .attr('opacity', 0)
              .text(loc.name);
          });
        }
      });
  }, [layers]); // Re-render when layers toggle

  useEffect(() => {
    if (!selectedUniversity || !svgRef.current || !zoomRef.current || !projectionRef.current) return;
    const [x, y] = projectionRef.current(selectedUniversity.university.coordinates) || [0, 0];
    d3.select(svgRef.current).transition()
      .duration(1200)
      .ease(d3.easeCubicInOut)
      .call(
        zoomRef.current.transform,
        d3.zoomIdentity.translate(MAP_WIDTH / 2, MAP_HEIGHT / 2).scale(15).translate(-x, -y)
      );
  }, [selectedUniversity]);

  const searchResults = cityUniversities.flatMap(city => 
    city.universities
      .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(u => ({ city, university: u }))
  );

  const allUniversities = cityUniversities.flatMap(city => 
    city.universities.map(u => ({ city, university: u }))
  ).sort((a, b) => a.university.name.localeCompare(b.university.name));

  return (
    <section className="py-12 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Campus Locator</h2>
            <p className="text-slate-500 text-lg">Interactive exploration of educational landscapes and student hubs.</p>
          </div>
          <button 
            onClick={() => navigate('/resources')}
            className="px-6 py-3 bg-white text-slate-700 rounded-2xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 group"
          >
            View All Data
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative w-full h-[700px] bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-xl flex flex-col md:flex-row">
          {/* Main Map Area */}
          <div className="relative flex-grow h-full bg-[#f8f9fa] border-r border-slate-100 order-2 md:order-1">
            
            {/* Layer Controls */}
            <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
              <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-white/40 flex flex-col gap-1">
                <button 
                  onClick={() => setLayers(l => ({ ...l, universities: !l.universities }))}
                  className={`p-2.5 rounded-xl transition-all ${layers.universities ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}
                  title="Universities"
                >
                  <GraduationCap className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setLayers(l => ({ ...l, accommodations: !l.accommodations }))}
                  className={`p-2.5 rounded-xl transition-all ${layers.accommodations ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}
                  title="Accommodations"
                >
                  <Home className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setLayers(l => ({ ...l, transport: !l.transport }))}
                  className={`p-2.5 rounded-xl transition-all ${layers.transport ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100'}`}
                  title="Transport Hubs"
                >
                  <Train className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Overlay */}
            <div className="absolute top-6 left-6 z-30 w-72 md:w-96">
              <div className="bg-white/80 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 flex items-center px-5 py-0.5 focus-within:ring-2 ring-blue-500/20 transition-all">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Find a campus..." 
                  className="flex-1 py-4 outline-none text-sm font-medium bg-transparent text-slate-800 placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => setSearchQuery('')} />}
              </div>

              <AnimatePresence>
                {searchQuery && searchResults.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="mt-3 bg-white/90 backdrop-blur-2xl rounded-[28px] shadow-2xl border border-white/50 max-h-[400px] overflow-y-auto custom-scrollbar p-2"
                  >
                    {searchResults.map((res, idx) => (
                      <button 
                        key={`${res.university.name}-${idx}`}
                        onClick={() => {
                          setSelectedUniversity(res);
                          setSearchQuery('');
                        }}
                        className="w-full px-5 py-4 text-left hover:bg-blue-50/50 rounded-2xl transition-colors flex items-center justify-between group"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{res.university.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{res.city.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-30 flex flex-col gap-3">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden flex flex-col">
                <button onClick={() => handleZoom('in')} className="p-4 hover:bg-slate-50 border-b border-slate-100 transition-colors text-slate-600"><Plus className="w-6 h-6" /></button>
                <button onClick={() => handleZoom('out')} className="p-4 hover:bg-slate-50 transition-colors text-slate-600"><Minus className="w-6 h-6" /></button>
              </div>
              <button onClick={resetView} className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-black transition-all transform hover:scale-105 active:scale-95">
                <Navigation className="w-6 h-6" />
              </button>
            </div>

            {/* Map Canvas */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden">
              {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
                  <span className="font-bold text-slate-400 tracking-widest uppercase text-xs animate-pulse">Initializing Map Layers</span>
                </div>
              )}
              <svg ref={svgRef} className="w-full h-full"></svg>
              
              {/* Region Tooltip */}
              <AnimatePresence>
                {hoveredCity && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    style={{ 
                      position: 'fixed',
                      left: mousePos.x + 20,
                      top: mousePos.y + 20,
                      pointerEvents: 'none'
                    }}
                    className="z-[100] bg-white/90 backdrop-blur-xl text-slate-900 px-5 py-3 rounded-full shadow-2xl border border-white/50 flex items-center gap-4"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none mb-1.5">Exploring</span>
                      <span className="text-sm font-bold truncate max-w-[120px]">{hoveredCity.name}</span>
                    </div>
                    <div className="h-8 w-px bg-slate-200"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-black text-slate-900 leading-none">{hoveredCity.count}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">Institutes</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Selected Point Details */}
            <AnimatePresence>
              {selectedUniversity && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  className="absolute bottom-8 left-8 z-40 bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/60 p-8 w-[340px]"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-md">University</div>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">{selectedUniversity.university.name}</h3>
                      <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-1.5 capitalize">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" /> {selectedUniversity.city.name}
                      </p>
                    </div>
                    <button onClick={() => setSelectedUniversity(null)} className="p-2 hover:bg-slate-100 rounded-2xl transition-colors">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 pb-6">
                      <div className="p-4 bg-slate-50 rounded-[24px]">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rank</span>
                        <span className="text-lg font-black text-slate-900 leading-none">#12 In China</span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-[24px]">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Students</span>
                        <span className="text-lg font-black text-slate-900 leading-none">45k+</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => navigate('/resources')}
                      className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                      Campus Dossier
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar: University List */}
          <div className="w-full md:w-96 h-[400px] md:h-full bg-white flex flex-col shrink-0 order-1 md:order-2 shadow-inner">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-2xl">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 tracking-tight text-lg leading-none">Institutions</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{allUniversities.length} Universities Listed</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3 bg-[#fafbfc]">
              {allUniversities.map((item, idx) => (
                <button
                  key={`${item.university.name}-${idx}`}
                  onClick={() => setSelectedUniversity(item)}
                  className={`w-full p-6 text-left rounded-[28px] border transition-all duration-500 group ${
                    selectedUniversity?.university.name === item.university.name 
                    ? 'bg-white border-blue-200 shadow-2xl relative z-10 scale-105' 
                    : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-100 hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 transition-all duration-500 ${
                      selectedUniversity?.university.name === item.university.name 
                      ? 'bg-blue-600 text-white rotate-12' 
                      : 'bg-slate-200/50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:-rotate-6'
                    }`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 pr-2">
                      <div className={`text-sm font-black leading-tight uppercase tracking-tight transition-colors mb-1 ${
                        selectedUniversity?.university.name === item.university.name ? 'text-blue-600' : 'text-slate-900'
                      }`}>
                        {item.university.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.city.name}</span>
                        {selectedUniversity?.university.name === item.university.name && (
                          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        .poi-layers circle, .poi-layers rect {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .poi-layers g:hover circle, .poi-layers g:hover rect {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
          transform: scale(1.4);
        }
      `}</style>
    </section>
  );
}
