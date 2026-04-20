export interface University {
  name: string;
  location: [number, number]; // [longitude, latitude]
}

export interface CityData {
  name: string;
  coordinates: [number, number];
  universities: string[];
}

export const cityUniversities: CityData[] = [
  {
    name: "Hangzhou",
    coordinates: [120.1535, 30.2874],
    universities: [
      "Zhejiang University",
      "China Jiliang University",
      "Zhejiang University of Technology",
      "Hangzhou Normal University",
      "Zhejiang Sci-Tech University",
      "Zhejiang Gongshang University"
    ]
  },
  {
    name: "Shanghai",
    coordinates: [121.4737, 31.2304],
    universities: [
      "Fudan University",
      "Shanghai Jiao Tong University",
      "Tongji University",
      "East China Normal University",
      "Shanghai University",
      "Donghua University"
    ]
  },
  {
    name: "Beijing",
    coordinates: [116.4074, 39.9042],
    universities: [
      "Peking University",
      "Tsinghua University",
      "Renmin University of China",
      "Beijing Normal University",
      "Beihang University",
      "Tsinghua University"
    ]
  },
  {
    name: "Nanjing",
    coordinates: [118.7968, 32.0603],
    universities: [
      "Nanjing University",
      "Southeast University",
      "Nanjing Normal University",
      "Nanjing University of Aeronautics and Astronautics"
    ]
  },
  {
    name: "Guangzhou",
    coordinates: [113.2644, 23.1291],
    universities: [
      "Sun Yat-sen University",
      "South China University of Technology",
      "Jinan University",
      "South China Normal University"
    ]
  },
  {
    name: "Wuhan",
    coordinates: [114.3055, 30.5928],
    universities: [
      "Wuhan University",
      "Huazhong University of Science and Technology",
      "Central China Normal University",
      "Wuhan University of Technology"
    ]
  },
  {
    name: "Chengdu",
    coordinates: [104.0668, 30.5728],
    universities: [
      "Sichuan University",
      "University of Electronic Science and Technology of China",
      "Southwest Jiaotong University"
    ]
  },
  {
    name: "Xi'an",
    coordinates: [108.9402, 34.3416],
    universities: [
      "Xi'an Jiaotong University",
      "Northwestern Polytechnical University",
      "Xidian University",
      "Shaanxi Normal University"
    ]
  },
  {
    name: "Tianjin",
    coordinates: [117.3446, 39.3484],
    universities: [
      "Tianjin University",
      "Nankai University",
      "Tianjin Normal University",
      "Tianjin Medical University"
    ]
  },
  {
    name: "Chongqing",
    coordinates: [106.5516, 29.5630],
    universities: [
      "Chongqing University",
      "Southwest University",
      "Chongqing Medical University"
    ]
  },
  {
    name: "Harbin",
    coordinates: [126.6424, 45.7569],
    universities: [
      "Harbin Institute of Technology",
      "Harbin Engineering University",
      "Northeast Forestry University"
    ]
  }
];
