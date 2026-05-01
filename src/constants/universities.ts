export interface University {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  recommended?: boolean;
  image?: string;
  gallery?: string[];
  majors?: string[];
  description?: string;
}

export interface CityData {
  name: string;
  coordinates: [number, number];
  universities: University[];
  cityImage?: string;
  cityDescription?: string;
}

export const cityUniversities: CityData[] = [
  {
    name: "Hangzhou",
    coordinates: [120.1535, 30.2874],
    cityImage: "https://images.unsplash.com/photo-1543887413-41bb3304191c?auto=format&fit=crop&q=80&w=1200",
    cityDescription: "Famous for its scenic West Lake and thriving technology sector, Hangzhou is a perfect blend of ancient history and cutting-edge innovation.",
    universities: [
      { 
        name: "Zhejiang University", 
        coordinates: [120.089, 30.301],
        image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
        ],
        majors: ["Computer Science", "Engineering", "Life Sciences", "Economics", "Industrial Design"],
        description: "Zhejiang University is one of China's oldest and most prestigious institutions. Known as the 'Cambridge of the East', it boasts a stunning campus and world-class research facilities, particularly in tech and biological sciences."
      },
      { 
        name: "Communication University of Zhejiang", 
        coordinates: [120.352, 30.315], 
        recommended: true,
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1498243639359-f7c895171f5f?auto=format&fit=crop&q=80&w=800"
        ],
        majors: ["Broadcasting", "Journalism", "Digital Media", "Animation", "Film Production"],
        description: "A premier hub for media and communications studies. CUZ is famous for its direct industry links with major Chinese broadcasting networks and its state-of-the-art production studios."
      },
      { 
        name: "China Jiliang University", 
        coordinates: [120.354, 30.315], 
        recommended: true,
        image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1200",
        majors: ["Quality Management", "Metrology", "Measurement Technology", "Standardization", "Applied Physics"],
        description: "The only university in China dedicated to quality supervision, inspection, and quarantine. It is a unique academic environment focusing on the science of standards and precision."
      },
      { 
        name: "Zhejiang Institute of Economics and Trade", 
        coordinates: [120.362, 30.322], 
        recommended: true,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
        majors: ["E-commerce", "International Trade", "Accounting", "Marketing", "Business Management"],
        description: "A modern business-focused institution located in Hangzhou's higher education zone, specializing in the digital economy and global trade logistics."
      },
      { 
        name: "Zhejiang University of Technology", 
        coordinates: [120.147, 30.295],
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200",
        majors: ["Chemical Engineering", "Mechanical Engineering", "Software Engineering", "Architecture", "Fine Arts"],
        description: "A leading industrial research university that focuses on practical application and engineering excellence, with strong ties to Zhejiang's manufacturing sector."
      },
      { 
        name: "Hangzhou Normal University", 
        coordinates: [120.016, 30.297],
        image: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?auto=format&fit=crop&q=80&w=1200",
        majors: ["Education", "Music", "Mathematics", "Tourism Management", "Biological Sciences"],
        description: "The alma mater of Jack Ma, this university is a vibrant center for the arts, teacher training, and innovation, known for its beautiful modern wetlands-inspired architecture."
      }
    ]
  },
  {
    name: "Shanghai",
    coordinates: [121.4737, 31.2304],
    cityImage: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&q=80&w=1200",
    cityDescription: "The 'Pearl of the Orient' and China's largest city. Shanghai is a global financial center and an architectural marvel featuring the iconic Bund and futuristic skyscrapers.",
    universities: [
      { 
        name: "Fudan University", 
        coordinates: [121.503, 31.297],
        image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"
        ],
        majors: ["International Relations", "Clinical Medicine", "Physics", "Chemistry", "Philosophy"],
        description: "A top-tier C9 League university located in Shanghai. Fudan is recognized globally for its liberal arts programs, high-impact research, and prestigious international atmosphere."
      },
      { 
        name: "East China Normal University", 
        coordinates: [121.405, 31.231], 
        recommended: true,
        image: "https://images.unsplash.com/photo-1498243639359-f7c895171f5f?auto=format&fit=crop&q=80&w=1200",
        majors: ["Psychology", "Geography", "Software Engineering", "Environmental Science", "Education Administration"],
        description: "ECNU is celebrated for its lush, green 'Garden Campus' and its pioneering research in education, developmental psychology, and ecological sciences."
      },
      { 
        name: "Shanghai Jiao Tong University", 
        coordinates: [121.432, 31.025],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
        majors: ["Mechanical Engineering", "Biomedical Engineering", "Naval Architecture", "Management Science", "Law"],
        description: "A titan of engineering and technology, SJTU is one of the most selective universities in China, training generations of innovators in the heart of the nation's financial capital."
      }
    ]
  },
  {
    name: "Harbin",
    coordinates: [126.6424, 45.7569],
    cityImage: "https://images.unsplash.com/photo-1521199395133-c971eb0589d3?auto=format&fit=crop&q=80&w=1200",
    cityDescription: "The 'Ice City' of China. Harbin is famous for its Russian architecture and its world-renowned International Ice and Snow Sculpture Festival.",
    universities: [
      { 
        name: "Harbin Institute of Technology", 
        coordinates: [126.632, 45.753], 
        recommended: true,
        image: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
        ],
        majors: ["Aerospace Engineering", "Materials Science", "Robotics", "Civil Engineering", "Computer Science"],
        description: "Known for its 'HIT' spirit, this institution is China's leader in aerospace and national defense research, often referred to as the 'Harvard of the North'."
      }
    ]
  },
  {
    name: "Beijing",
    coordinates: [116.4074, 39.9042],
    cityImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1200",
    cityDescription: "The political and cultural heart of China. Beijing is home to seven UNESCO World Heritage Sites including the Forbidden City and the Great Wall.",
    universities: [
      { 
        name: "Peking University", 
        coordinates: [116.310, 39.992],
        image: "https://images.unsplash.com/photo-1543165796-5426273eaec3?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1466695108335-44674ac2058b?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcf?auto=format&fit=crop&q=80&w=800"
        ],
        majors: ["Mathematics", "Physics", "Literature", "History", "Clinical Medicine"],
        description: "The intellectual heart of China. PKU's campus, featuring the iconic Weiming Lake, is as beautiful as its academic record is legendary."
      },
      { 
        name: "Tsinghua University", 
        coordinates: [116.326, 40.003],
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"
        ],
        majors: ["Computer Science", "Structural Engineering", "Artificial Intelligence", "Business Administration", "Environment Engineering"],
        description: "Consistently ranked as Asia's #1 university, Tsinghua is a global powerhouse in STEM and social sciences, producing world leaders and tech giants."
      }
    ]
  }
];

