import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, GraduationCap, Building2, Search, RefreshCw, Globe2, ArrowRight } from 'lucide-react';
import { cityUniversities, CityData } from '../constants/universities';

export default function UniversityMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    // Clear previous content
    svg.selectAll('*').remove();

    // Projection
    const projection = d3.geoMercator()
      .center([105, 36])
      .scale(850)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Using a very stable CDN-served GeoJSON file from ECharts legacy maps
    d3.json('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/china.json')
      .then((data: any) => {
        setLoading(false);
        setError(null);
        
        const features = data.features;
        
        if (!features || features.length === 0) {
          throw new Error('Invalid map data format');
        }

        const mapGroup = svg.append('g').attr('class', 'map-content');

        // Zoom logic
        const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on('zoom', (event) => {
            mapGroup.attr('transform', event.transform);
            
            // Show/Hide labels based on zoom
            mapGroup.selectAll('.city-label')
              .attr('opacity', event.transform.k > 2 ? 1 : 0);
            
            // Scale markers down as we zoom in so they don't get huge
            mapGroup.selectAll('.marker-group')
              .attr('transform', `scale(${1 / event.transform.k})`);
          });

        svg.call(zoom as any);

        // Draw provinces
        mapGroup.append('g')
          .attr('class', 'provinces')
          .selectAll('path')
          .data(features)
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', '#f8fafc') // Clean "Amap" style light land color
          .attr('stroke', '#e2e8f0') // Soft but distinct borders
          .attr('stroke-width', 0.6)
          .attr('class', 'province transition-colors duration-200 outline-none')
          .style('cursor', 'pointer')
          .on('mouseover', function(event, d: any) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('fill', '#f1f5f9')
              .attr('stroke', '#94a3b8')
              .attr('stroke-width', 1);
            setHoveredCity(d.properties.name);
          })
          .on('mouseout', function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('fill', '#f8fafc')
              .attr('stroke', '#e2e8f0')
              .attr('stroke-width', 0.6);
            setHoveredCity(null);
          });

        // Draw city markers and names
        const markers = mapGroup.append('g').attr('class', 'markers');

        cityUniversities.forEach(city => {
          const coords = projection(city.coordinates as [number, number]);
          if (!coords) return;
          const [x, y] = coords;
          
          const cityMarkerGroup = markers.append('g')
            .attr('class', 'city-marker-container')
            .attr('transform', `translate(${x},${y})`);

          const markerGroup = cityMarkerGroup.append('g')
            .attr('class', 'marker-group')
            .style('cursor', 'pointer')
            .on('click', () => setSelectedCity(city));

          // Pin "shadow" or base pulse
          markerGroup.append('circle')
            .attr('r', 8)
            .attr('fill', '#ef4444')
            .attr('opacity', 0.2)
            .append('animate')
            .attr('attributeName', 'r')
            .attr('values', '8;14;8')
            .attr('dur', '3s')
            .attr('repeatCount', 'indefinite');

          // The modern pin (Amap style)
          const pinPath = "M0,0 C-3,-3 -6,-6 -6,-10 C-6,-13.3 -3.3,-16 0,-16 C3.3,-16 6,-13.3 6,-10 C6,-6 3,-3 0,0 Z";
          
          markerGroup.append('path')
            .attr('d', pinPath)
            .attr('fill', '#ef4444')
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 1)
            .attr('class', 'drop-shadow-sm');

          // Pin "hole"
          markerGroup.append('circle')
            .attr('cy', -10)
            .attr('r', 2)
            .attr('fill', 'white');

          // City Label (Visible on zoom) - Clean typography
          cityMarkerGroup.append('text')
            .attr('class', 'city-label')
            .attr('dy', 8)
            .attr('text-anchor', 'middle')
            .attr('fill', '#475569')
            .attr('font-weight', '600')
            .attr('font-size', '9px')
            .attr('font-family', 'Inter, sans-serif')
            .attr('opacity', 0) // Hidden by default
            .text(city.name);
        });
      })
      .catch(err => {
        console.error('Error loading map data:', err);
        setError('Failed to load map data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <section id="university-map" className="py-32 bg-[#f1f5f9] relative overflow-hidden font-sans">
      {/* Background decoration - Map motif */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div className="max-w-2xl text-left">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100"
            >
              <Globe2 className="w-3.5 h-3.5" />
              Intelligence Map
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] tracking-tight mb-4">University <span className="text-blue-600">Locator.</span></h2>
            <p className="text-lg text-[#64748b] leading-relaxed">
              Navigate China's top academic hubs with our proprietary intelligence map. Discover elite institutions in every major city.
            </p>
          </div>
          
          {/* Quick Stats Panel */}
          <div className="flex gap-12 bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm self-start md:self-center">
            <div>
              <div className="text-2xl font-bold text-[#0f172a]">30+</div>
              <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest">Cities</div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div>
              <div className="text-2xl font-bold text-[#0f172a]">150+</div>
              <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest">Institutions</div>
            </div>
          </div>
        </div>

        <div className="relative bg-white rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden min-h-[600px]">
          {/* Map Controls Overlay (Amap style) */}
          <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
            <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 flex flex-col gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors" title="Zoom In">
                <Search className="w-5 h-5 rotate-90" />
              </button>
              <div className="h-px bg-slate-100 w-full"></div>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors" title="Reset View" onClick={() => window.location.reload()}>
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 h-full">
            {/* Map Canvas */}
            <div className="flex-1 w-full flex justify-center relative min-h-[400px] md:min-h-[550px] bg-[#f8fafc] rounded-2xl overflow-hidden shadow-inner border border-slate-50">
              {(loading || error) && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-50/80 backdrop-blur-md">
                  <div className="flex flex-col items-center gap-6 p-8 text-center max-w-sm">
                    {loading ? (
                      <>
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                          <Globe2 className="absolute inset-0 m-auto w-6 h-6 text-blue-600 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-[#0f172a]">Analyzing Regions...</h3>
                          <p className="text-slate-500 text-sm">Building interactive geographic database</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                          <RefreshCw className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-[#0f172a]">System Offline</h3>
                          <p className="text-slate-500 text-sm">{error}</p>
                        </div>
                        <button 
                          onClick={() => window.location.reload()}
                          className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                        >
                          Retry Initialization
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              <div className="relative w-full h-full flex items-center justify-center cursor-move">
                <svg ref={svgRef} className="w-full h-full"></svg>
                
                {/* Floating Tooltip Indicator */}
                <AnimatePresence>
                  {hoveredCity && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute pointer-events-none bg-white/90 backdrop-blur-xl border border-slate-200 text-[#0f172a] px-4 py-2 rounded-xl shadow-xl text-sm font-bold flex items-center gap-2 z-30"
                      style={{ 
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      {hoveredCity} Province
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* University List Panel - Slide-in Amap style */}
            <div className="w-full lg:w-[400px] h-full flex flex-col p-2">
              <AnimatePresence mode="wait">
                {selectedCity ? (
                  <motion.div
                    key={selectedCity.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-[#f8fafc] rounded-2xl p-6 h-full flex flex-col border border-slate-100 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#0f172a] leading-none">{selectedCity.name}</h3>
                          <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest leading-none mt-1 inline-block">Regional Hub</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCity(null)}
                        className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shadow-sm"
                      >
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education Directory ({selectedCity.universities.length})</div>
                      <div className="grid gap-3">
                        {selectedCity.universities.map((uni, idx) => (
                          <motion.div
                            key={uni}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group flex flex-col gap-2 p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <Building2 className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                              <span className="text-[#0f172a] font-semibold text-sm line-clamp-1">{uni}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">TOP TIER</span>
                              <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-bold">SCHOLARSHIP AVAILABLE</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 w-full py-4 bg-[#0f172a] text-white rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Apply Now in {selectedCity.name}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#f8fafc] rounded-2xl border border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 animate-float">
                      <Globe2 className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0f172a] mb-2 tracking-tight">Interactive Campus Guide</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
                      Select a pulsing marker to view historical and modern institutions in that region.
                    </p>
                    
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                      {['Hangzhou', 'Shanghai', 'Beijing'].map(city => (
                        <button
                          key={city}
                          onClick={() => {
                            const data = cityUniversities.find(c => c.name === city);
                            if (data) setSelectedCity(data);
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
