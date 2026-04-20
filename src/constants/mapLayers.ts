export interface MapLocation {
  name: string;
  type: 'transport' | 'accommodation';
  coordinates: [number, number];
}

export const additionalLocations: MapLocation[] = [
  // Transport Hubs - Hangzhou
  { name: "Hangzhou East Railway Station", type: 'transport', coordinates: [120.213, 30.292] },
  { name: "Xiaoshan International Airport", type: 'transport', coordinates: [120.435, 30.229] },
  // Accommodations - Hangzhou
  { name: "ZJU International Student Dorms", type: 'accommodation', coordinates: [120.085, 30.305] },
  { name: "Campus View Apartments", type: 'accommodation', coordinates: [120.358, 30.318] },

  // Shanghai
  { name: "Shanghai Hongqiao Railway Station", type: 'transport', coordinates: [121.320, 31.194] },
  { name: "Pudong International Airport", type: 'transport', coordinates: [121.808, 31.144] },
  { name: "Shanghai Railway Station", type: 'transport', coordinates: [121.455, 31.249] },
  { name: "Xuhui Student Living", type: 'accommodation', coordinates: [121.435, 31.030] },
  { name: "Fudan North Residence", type: 'accommodation', coordinates: [121.505, 31.300] },

  // Beijing
  { name: "Beijing Capital International Airport", type: 'transport', coordinates: [116.587, 40.079] },
  { name: "Beijing South Railway Station", type: 'transport', coordinates: [116.378, 39.865] },
  { name: "Haidian Student Village", type: 'accommodation', coordinates: [116.315, 39.985] },
  { name: "Tsinghua West Garden", type: 'accommodation', coordinates: [116.320, 40.005] },

  // Nanjing
  { name: "Nanjing South Railway Station", type: 'transport', coordinates: [118.798, 31.970] },
  { name: "Gulou Campus Housing", type: 'accommodation', coordinates: [118.777, 32.058] },

  // Guangzhou
  { name: "Guangzhou South Railway Station", type: 'transport', coordinates: [113.268, 22.988] },
  { name: "Higher Education Mega Center South", type: 'accommodation', coordinates: [113.385, 23.045] },

  // Wuhan
  { name: "Wuhan Railway Station", type: 'transport', coordinates: [114.425, 30.607] },
  { name: "Donghu Student Suites", type: 'accommodation', coordinates: [114.368, 30.545] },

  // Chengdu
  { name: "Chengdu East Railway Station", type: 'transport', coordinates: [104.141, 30.629] },
  { name: "Tianfu District Housing", type: 'accommodation', coordinates: [104.068, 30.560] },

  // Xi'an
  { name: "Xi'an North Railway Station", type: 'transport', coordinates: [108.938, 34.375] },
  { name: "Qujiang Student Lofts", type: 'accommodation', coordinates: [108.988, 34.235] }
];
