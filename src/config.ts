export const siteConfig = {
	name: "Max Huber",
	title:
		"Full Stack / AI Engineer | CS / AI Student at Northeastern University",
	description: "Max Huber's Portfolio",
	accentColor: "#00A99D",
	social: {
		email: "huber.maxi@northeastern.edu",
		linkedin: "https://linkedin.com/in/max-huber888",
		twitter: "https://x.com/maxhuber888",
		github: "https://github.com/MaxHuber888",
	},
	aboutMe:
		"I am an AI/ML engineer focused on building systems with clear real-world impact. My work is guided by a simple principle: effective technology should solve hard problems and make people's lives tangibly better. I'm currently completing a Master's degree in AI and researching network theoretic analysis in neuroscience at the Movement Neuroscience Lab at Northeastern University.",
	skills: [
		"Python",
		"C++",
		"Java",
		"SQL",
		"JavaScript",
		"TypeScript",
		"TensorFlow",
		"PyTorch",
		"OpenCV",
		"LangChain",
		"LangGraph",
		"LlamaIndex",
		"NLTK",
		"GitHub",
		"Conda",
		"Poetry",
		"Redis",
		"Apache Airflow",
		"GCP (Cloud Storage, BigQuery, Firebase)",
		"AWS (S3, EC2, SageMaker)",
	],
	projects: [
		{
			name: "ZerePy",
			description:
				"Open-source autonomous LLM agent framework with decision context tracking and multi-step workflow execution. 500+ GitHub stars.",
			githubLink: "https://github.com/blorm-network/ZerePy",
			image: "/images/projects/Zerepy.png",
			skills: ["Python", "LangChain", "LangGraph"],
		},
		{
			name: "TextStemSep",
			description:
				"Text-conditioned audio stem separation model extending HT-Demucs with CLAP-driven cross-modal attention.",
			githubLink: "https://github.com/MaxHuber888/TextStemSep",
			demoLink: "https://huggingface.co/spaces/jacob1576/AudioTextHTDemucs",
			image: "/images/projects/TextStemSep.png",
			skills: ["Python", "PyTorch", "CLAP", "Transformers"],
		},
		{
			name: "GeoSurfMap",
			description:
				"Mid-level fusion CNN classifying surficial geology from multimodal remote sensing data (RGB, NIR, DEM) for flood risk assessment.",
			mediumLink:
				"https://medium.com/@huber.max888/surficial-geology-mapping-from-multimodal-data-c8c2ea783279",
			image: "/images/projects/GeoSurfMap.png",
			skills: ["Python", "PyTorch", "Multimodal", "CNN"],
		},
		{
			name: "DeepSquid",
			description:
				"Deepfake video classification RNN using a pretrained time-distributed MesoNet feature extractor with LSTM layers.",
			githubLink: "https://github.com/MaxHuber888/DeepSquid",
			image: "/images/projects/DeepSquid.png",
			skills: ["Python", "TensorFlow", "OpenCV"],
		},
	],
	experience: [
		{
			company: "Northeastern University, Movement Neuroscience Lab",
			title: "AI/ML Research Assistant",
			dateRange: "Mar. 2025 – Present",
			bullets: [
				"Analyzing muscle synergies via multiplex networks (GCMI) and community detection (SBM) to inform digital twins for stroke rehabilitation.",
				"Applied NMF and constrained clustering to identify and compare synergy patterns across patient cohorts.",
				"Built Python pipelines for high-dimensional EMG signal processing and NetworkX-based graph analysis.",
			],
		},
		{
			company: "Blorm",
			title: "AI/ML Engineer",
			dateRange: "Nov. 2024 – Mar. 2025",
			bullets: [
				"Built ZerePy, an open-source autonomous LLM agent framework; grew to 500+ GitHub stars across multiple hackathons.",
				"Scaled ZerePy into Blormmy, an AI-powered crypto wallet for streamlined transfers and swaps.",
			],
		},
		{
			company: "CollX",
			title: "Full Stack Engineer [Co-op]",
			dateRange: "Mar. 2023 – Dec. 2023",
			bullets: [
				"Built a RAG chatbot for trading card queries, achieving a 90% reduction in average query time.",
				"Scheduled Airflow ETL pipelines to automate AI knowledge index updates and improve visual search accuracy.",
				"Created a Metabase KPI dashboard from SQL data to track marketplace growth and inform outreach strategy.",
			],
		},
	],
	education: [
		{
			school: "Northeastern University, Khoury College of Computer Science",
			degree: "M.S. in Artificial Intelligence",
			dateRange: "Sep. 2024 – Present",
			achievements: ["Current GPA: 3.92 / 4.00"],
		},
		{
			school: "Northeastern University, Khoury College of Computer Science",
			degree:
				"B.S. in Computer Science, Concentration in Artificial Intelligence",
			dateRange: "Sep. 2020 – Aug. 2024",
			achievements: [
				"GPA: 3.72 / 4.00",
				"University Honors Distinction",
				"Dean's List",
			],
		},
	],
};
