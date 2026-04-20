export interface University {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface CityData {
  name: string;
  coordinates: [number, number];
  universities: University[];
}

export const cityUniversities: CityData[] = [
  {
    name: "Hangzhou",
    coordinates: [120.1535, 30.2874],
    universities: [
      { name: "Zhejiang University", coordinates: [120.089, 30.301] },
      { name: "China Jiliang University", coordinates: [120.354, 30.315] },
      { name: "Zhejiang University of Technology", coordinates: [120.147, 30.295] },
      { name: "Hangzhou Normal University", coordinates: [120.016, 30.297] }
    ]
  },
  {
    name: "Shanghai",
    coordinates: [121.4737, 31.2304],
    universities: [
      { name: "Fudan University", coordinates: [121.503, 31.297] },
      { name: "Shanghai Jiao Tong University", coordinates: [121.432, 31.025] },
      { name: "Tongji University", coordinates: [121.506, 31.282] }
    ]
  },
  {
    name: "Beijing",
    coordinates: [116.4074, 39.9042],
    universities: [
      { name: "Peking University", coordinates: [116.310, 39.992] },
      { name: "Tsinghua University", coordinates: [116.326, 40.003] },
      { name: "Renmin University of China", coordinates: [116.319, 39.970] }
    ]
  },
  {
    name: "Nanjing",
    coordinates: [118.7968, 32.0603],
    universities: [
      { name: "Nanjing University", coordinates: [118.775, 32.055] },
      { name: "Southeast University", coordinates: [118.791, 32.049] }
    ]
  },
  {
    name: "Guangzhou",
    coordinates: [113.2644, 23.1291],
    universities: [
      { name: "Sun Yat-sen University", coordinates: [113.298, 23.097] },
      { name: "South China University of Technology", coordinates: [113.344, 23.155] }
    ]
  },
  {
    name: "Wuhan",
    coordinates: [114.3055, 30.5928],
    universities: [
      { name: "Wuhan University", coordinates: [114.363, 30.540] },
      { name: "Huazhong University of Science and Technology", coordinates: [114.415, 30.514] }
    ]
  },
  {
    name: "Chengdu",
    coordinates: [104.0668, 30.5728],
    universities: [
      { name: "Sichuan University", coordinates: [104.081, 30.633] },
      { name: "University of Electronic Science and Technology of China", coordinates: [103.929, 30.751] }
    ]
  },
  {
    name: "Xi'an",
    coordinates: [108.9402, 34.3416],
    universities: [
      { name: "Xi'an Jiaotong University", coordinates: [108.983, 34.244] },
      { name: "Northwestern Polytechnical University", coordinates: [108.913, 34.241] }
    ]
  }
];
