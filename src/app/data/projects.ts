export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  year: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export const allProjects: Project[] = [
  {
    id: 1,
    title: "Alpha Spendlog",
    category: "Web Application",
    description:
      "A finance dashboard with real-time data visualization, RBAC, and a sleek dark-mode UI.",
    longDescription:
      "Web application built with React and Firebase for personal finance management. Features real-time transaction tracking, interactive charts with Chart.js, role-based access control, and a modern dark-mode design.",
    tech: ["React", "Typescript", "Tailwind CSS", "Firebase"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772541110/finance_vhncpq.jpg",
      // "https://images.unsplash.com/photo-1720962158813-29b66b8e23e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBkYXJrJTIwdWl8ZW58MXx8fHwxNzcyMzA5MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2026",
    githubUrl: "https://github.com/ARUN-AK5011/alpha-spendlog",
    liveUrl: "https://alphaspend.netlify.app",
    featured: true,
  },
  {
    id: 2,
    title: "Alpha Blog",
    category: "Web Application",
    description:
      "A modern blogging platform with markdown support, AI-generated summaries, and a clean, responsive design.",
    longDescription:
      "Blog wesite build with reactjs and firebase as a database with authentication. The signup users can able to add, edit and manage the blogs with like and command the other blogs. Can able to filter the blogs based on the category and search the blogs with the title.",
    tech: ["React", "Typescript", "Tailwind CSS", "Firebase"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772540633/blog_lq1e5m.jpg",
    year: "2026",
    githubUrl: "https://github.com/ARUN-AK5011/alpha-blogs-creator",
    liveUrl: "https://blogsalpha.netlify.app",
    featured: true,
  },
  {
    id: 3,
    title: "Food Order",
    category: "Web Application",
    description:
      "Customer can able to place food orders online and track their food cooking status.",
    longDescription:
      "Food ordering web application built with React.js for an interactive menu. Integrates Supabase for real-time order tracking. Deployed on Netlify with CI/CD.",
    tech: ["React.js", "Firebase", "Supabase"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772540265/food_o2sntp.jpg",
    year: "2025",
    githubUrl: "https://github.com/ARUN-AK5011/FOOD_ORDER",
    liveUrl: "https://saravanacafe.netlify.app",
    featured: true,
  },
  {
    id: 4,
    title: "Automated Doc/Book Scanner",
    category: "Desktop Application",
    description:
      "AI-assisted tool for scanning and digitizing documents and books with OCR and metadata extraction.",
    longDescription:
      "Desktop application built with Python and OpenCV for high-quality document scanning, OCR using Tesseract, and metadata tagging. Features batch processing, export to PDF, and cloud sync capabilities.",
    tech: ["Python", "OpenCV", "Tesseract", "Electron"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772455676/Arduino_1_ywgqyr.png",
    year: "2024",
    githubUrl: "https://github.com/ARUN-AK5011/Automated_Page_Turner",
    liveUrl: "https://automated-doc-scanner.demo",
    featured: true,
  },
  {
    id: 5,
    title: "CRM & Ticketing System",
    category: "SaaS Platform",
    description:
      "Customer relationship management and support ticketing system with automation, analytics, and a user-friendly interface.",
    longDescription:
      "SaaS platform combining CRM and support ticketing. Built with React.js frontend and Golang backend, it features automated ticket routing, customer interaction analytics, and a clean UI. Deployed on Google Cloud with Firebase for real-time updates. It was an Internel Project for a company to manage the customer relationship and support tickets.",
    tech: ["React.js", "Golang", "Python", "Mysql", "Firebase", "Google Cloud", "Docker"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772541720/crm_qwohpj.jpg",
    year: "2024",
    githubUrl: "https://github.com/ARUN-AK5011",
    liveUrl: "https://github.com/ARUN-AK5011",
    featured: false,
  },
  {
    id: 6,
    title: "Wedoura",
    category: "SaaS Platform",
    description:
      "Wedoura will find your perfect wedding partner. ",
    longDescription:
      "Wedoura is a SaaS platform that helps users find their perfect wedding partner. It provides a curated list of potential partners based on user preferences and compatibility scores. The platform also offers features like messaging, profile customization, and event planning tools to help users connect and plan their special day.",
    tech: ["Nextjs", "React Native", "Tailwind CSS", "NestJS", "Firebase", "GCS", "GMaps", "Docker"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772542064/wedding_x9y1gj.jpg",
    year: "2023",
    githubUrl: "https://github.com/ARUN-AK5011",
    liveUrl: "https://wedoura.com",
    featured: false,
  },
  {
    id: 7,
    title: "GoWheels",
    category: "SaaS Platform",
    description:
      "GoWheels Uber for busses. A ride-sharing platform connecting bus drivers with passengers for efficient and affordable transportation.",
    longDescription:
      "GoWheels is a ride-sharing platform that connects bus drivers with passengers for efficient and affordable transportation. The platform allows users to book rides, track their bus in real-time, and make secure payments.",
    tech: ["Reactjs", "React Native", "Tailwind CSS", "Golang", "Firebase", "GCP", "Docker"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772542345/Bus_app_oqhig3.jpg",
    year: "2023",
    githubUrl: "https://github.com/ARUN-AK5011",
    liveUrl: "https://github.com/ARUN-AK5011",
    featured: false,
  },
  {
    id: 8,
    title: "Newzio",
    category: "Web Application",
    description:
      "A news aggregation platform built with Python and NewsAPI.",
    longDescription:
      "Categorize and filter news by article and cities. It provides users with a personalized news feed based on their preferences and location. The platform also includes features like bookmarking, sharing, and commenting on news articles.",
    tech: ["HTML", "CSS", "Python", "News API", "Sqlite"],
    image:
      "https://res.cloudinary.com/instarental/image/upload/v1772542655/news_sqln0x.jpg",
    year: "2022",
    githubUrl: "https://github.com/ARUN-AK5011/Newzio",
    liveUrl: "https://newzio.onrender.com/",
    featured: false,
  },
];

export const featuredProjects = allProjects.filter((p) => p.featured);
