// All site content + data — Mir Sazzat Hossain
const SITE = {
  name: "Mir Sazzat Hossain",
  short: "Mir Sazzat",
  title: "Junior Research Scientist",
  affiliation: "Center for Computational & Data Sciences",
  affiliationUrl: "https://ccds.ai/",
  institution: "Independent University, Bangladesh",
  institutionUrl: "https://iub.edu.bd/",
  location: "Dhaka, Bangladesh",
  email: "mirsazzathossain@gmail.com",
  phdStatus: "PhD Applicant — Fall 2026",
  bio: "A highly motivated and aspiring researcher with a strong background in computer vision and machine learning. Over the past two years, I have actively contributed to the field, publishing research articles in well-regarded conferences such as ICIP and IJCNN. My primary research interests center around various aspects of computer vision and solving real-world problems from different domains using it.",
  bioLong: [
    "Currently, I am working as a Junior Research Scientist at the Center for Computational & Data Sciences (CCDS) at Independent University, Bangladesh. My current research projects include domain adaptation, Mixtures-of-Experts in large multi-modal models (LMMs), protein dynamics prediction using 3D CNNs, and particle jet tagging using graph neural networks.",
    "To advance my research experience, I am actively seeking Ph.D. positions in computer vision and machine learning, focusing on topics such as domain adaptation, self-supervised learning, generative models, and vision-language models. I am committed to continuous learning and growth and am excited to contribute to the advancement of computer vision and machine learning research.",
  ],
  socials: [
    { kind: "scholar", url: "#", label: "Google Scholar" },
    { kind: "github", url: "#", label: "GitHub" },
    { kind: "linkedin", url: "#", label: "LinkedIn" },
    { kind: "twitter", url: "#", label: "Twitter / X" },
    { kind: "email", url: "mailto:mirsazzathossain@gmail.com", label: "Email" },
  ],
  research: ["Computer Vision", "Domain Adaptation", "Vision-Language Models", "Federated Learning", "Radio Astronomy", "Super-Resolution"],
};

const NEWS = [
  { date: "2026-04", text: "Two papers accepted at ICIP 2025 — BD Open LULC Map and RGC-BENT.", tag: "paper" },
  { date: "2026-01", text: "FedCTTA accepted at IJCNN 2025.", tag: "paper" },
  { date: "2025-08", text: "Travel grant of $1,000 from IEEE Signal Processing Society for ICIP 2024.", tag: "award" },
  { date: "2024-07", text: "Promoted to Junior Research Scientist at CCDS.", tag: "career" },
  { date: "2024-05", text: "ICIP 2024 paper accepted — Lightweight Recurrent Network for Image Super-Resolution.", tag: "paper" },
  { date: "2023-04", text: "First paper accepted at IJCNN 2023 INNS-DLIA workshop.", tag: "paper" },
];

const PUBLICATIONS = [
  { id: "bdlulc-icip-2025", year: 2025, title: "BD Open LULC Map: High-Resolution Land Use and Land Cover Mapping & Benchmarking for Urban Development in Dhaka, Bangladesh", authors: ["M.S. Hossain", "R.H. Rajib", "M.A.K. Iftee", "O. Paul", "A.B.S. Nayem", "A. Sarker", "M.A. Amin", "A.A. Ali", "A.K.M.M. Rahman"], venue: "ICIP 2025", venueLong: "2025 IEEE International Conference on Image Processing, Anchorage, USA", type: "Conference", rank: "CORE B", featured: true, arxiv: "2505.21915", abstract: "We present BD Open LULC Map, a high-resolution land-use and land-cover dataset for Dhaka, Bangladesh, alongside benchmarks of modern semantic segmentation models for urban planning workflows. The dataset spans 12 LULC classes at 0.6m resolution, covering 1,200 sq km of greater Dhaka.", contributions: ["First open high-resolution LULC map for South-Asian urban development.", "Benchmark of 8 segmentation architectures including Swin-UNet and SegFormer.", "Reproducible pipeline released as a Python package."], links: { paper: "#", arxiv: "#", code: "#", bibtex: "#" } },
  { id: "rgc-bent-icip-2025", year: 2025, title: "RGC-BENT: A Novel Dataset for BENT Radio Galaxy Classification", authors: ["M.S. Hossain", "K.M.B. Asad", "P. Saikia", "A. Khan", "M.A.K. Iftee", "R.H. Rajib", "A. Momen", "J.K. Ghosh", "M.A. Amin", "A.A. Ali", "A.K.M.M. Rahman"], venue: "ICIP 2025", venueLong: "2025 IEEE International Conference on Image Processing, Anchorage, USA — pp. 2868–2873", type: "Conference", rank: "CORE B", featured: true, abstract: "RGC-BENT introduces a curated dataset of bent-tail radio galaxies sourced from the FIRST and NVSS surveys, with morphology labels validated against expert astronomer consensus. We benchmark CNNs and equivariant networks on the binary task of identifying bent versus standard radio sources.", contributions: ["1,438 hand-curated bent radio galaxy images with consensus labels.", "Benchmark of 6 architectures including group-equivariant CNNs.", "Strong evidence that rotation equivariance helps under limited data."], links: { paper: "#", code: "#", bibtex: "#" } },
  { id: "fedctta-ijcnn-2025", year: 2025, title: "FedCTTA: A Collaborative Approach to Continual Test-Time Adaptation in Federated Learning", authors: ["R.H. Rajib", "M.A.K. Iftee", "M.S. Hossain", "A.M. Rahman", "S. Mistry", "M.A. Amin", "A.A. Ali"], venue: "IJCNN 2025", venueLong: "2025 International Joint Conference on Neural Networks (IJCNN), Rome, Italy", type: "Conference", rank: "CORE B", featured: true, arxiv: "2505.13643", abstract: "FedCTTA proposes a privacy-preserving collaborative approach to continual test-time adaptation in federated settings. Clients exchange feature statistics rather than raw data, allowing each client to adapt to its evolving target distribution while leveraging knowledge from the federation.", contributions: ["Privacy-preserving CTTA via shared statistics, not raw data.", "Robust to non-IID label and covariate shifts across clients.", "Outperforms FedAvg-CTTA baselines by 4.2% mean accuracy."], links: { paper: "#", arxiv: "#", code: "#", slides: "#", video: "#", bibtex: "#" } },
  { id: "litesrnet-icip-2024", year: 2024, title: "Lightweight Recurrent Neural Network for Image Super-Resolution", authors: ["M.S. Hossain", "A.M. Rahman", "M.A. Amin", "A.A. Ali"], venue: "ICIP 2024", venueLong: "2024 IEEE International Conference on Image Processing (ICIP), Abu Dhabi, UAE — pp. 1567–1573", type: "Conference", rank: "CORE B", featured: true, abstract: "LiteSRNet is a recurrent super-resolution network with under 200K parameters, designed for deployment on edge devices. It achieves competitive PSNR/SSIM on standard benchmarks while running 3× faster than comparable lightweight baselines.", contributions: ["< 200K parameters, runs in real time on Raspberry Pi 4.", "Recurrent residual blocks reuse weights across stages.", "Code, weights, and reproducible training pipeline released."], links: { paper: "#", code: "#", poster: "#", bibtex: "#" } },
  { id: "rgc-innsdlia-2023", year: 2023, title: "Morphological Classification of Radio Galaxies using Semi-Supervised Group Equivariant CNNs", authors: ["M.S. Hossain", "S. Roy", "K.M.B. Asad", "A. Momen", "A.A. Ali", "M.A. Amin", "A.K.M.M. Rahman"], venue: "INNS-DLIA 2023", venueLong: "Procedia Computer Science Vol. 222 (INNS-DLIA workshop @ IJCNN 2023) — pp. 601–612", type: "Workshop", abstract: "We apply group-equivariant CNNs to the morphological classification of radio galaxies under semi-supervised conditions, leveraging unlabeled FIRST survey data via FixMatch-style consistency regularization.", contributions: ["First application of group equivariance to radio-galaxy morphology.", "Semi-supervised pipeline reduces label requirements by ~70%.", "Released RGC-v1 dataset and reference implementation."], links: { paper: "#", code: "#", slides: "#", poster: "#", bibtex: "#" } },
  { id: "rmma-wacv-2026", year: 2026, title: "R-MMA: Enhancing Vision-Language Models with Recurrent Adapters for Few-Shot and Cross-Domain Generalization", authors: ["M. Fahim", "M.F. Salman", "M.S. Hossain", "M.A. Amin", "A.A. Ali", "A. Rahman"], venue: "WACV 2026", venueLong: "Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision — pp. 4980–4990", type: "Conference", rank: "CORE A", abstract: "R-MMA is a recurrent multi-modal adapter for vision-language models that enables strong few-shot and cross-domain generalization at a fraction of the parameters of full fine-tuning.", contributions: ["Recurrent adapter design tuned for VLM cross-domain transfer.", "0.7% trainable parameters, on par with LoRA at 4× lower memory."], links: { paper: "#", code: "#", bibtex: "#" } },
  { id: "blp-2025", year: 2025, title: "Benchmarking Large Language Models on Bangla Dialect Translation and Dialectal Sentiment Analysis", authors: ["M.M. Jawad", "R. Ahmed", "S. Apon", "T.H. Tonmoy", "T. Haider", "M.S. Hossain", "M.T.A. Bhuiyan"], venue: "BLP 2025", venueLong: "Proceedings of the Second Workshop on Bangla Language Processing (BLP-2025), Mumbai — pp. 422–437", type: "Workshop", abstract: "We benchmark frontier LLMs on Bangla dialect translation and dialectal sentiment analysis across five regional dialects. Released datasets surface deep gaps in current open-source models for low-resource South-Asian languages.", contributions: ["First multi-dialect Bangla translation + sentiment benchmark.", "Best Long Paper award at BLP 2025."], links: { paper: "#", code: "#", bibtex: "#" } },
  { id: "slomo-fast-2025", year: 2025, title: "SloMo-Fast: Slow-Momentum and Fast-Adaptive Teachers for Source-Free Continual Test-Time Adaptation", authors: ["M.A.K. Iftee", "M.S. Hossain", "R.H. Rajib", "T. Iqbal", "M.M. Islam", "M.A. Amin", "A.A. Ali", "A. Rahman"], venue: "arXiv", venueLong: "Preprint, in submission", type: "Preprint", abstract: "SloMo-Fast pairs a slow-momentum teacher with a fast-adaptive teacher for source-free continual test-time adaptation, robust to abrupt and gradual distribution drift.", contributions: ["Dual-teacher design for source-free CTTA.", "State-of-the-art on CIFAR-10/100-C and ImageNet-C continual benchmarks."], links: { paper: "#", arxiv: "#", bibtex: "#" } },
];

const POSTS = [
  { slug: "group-theory-equivariant-nn", title: "Diving into Group Theory: Foundations for Equivariant Neural Networks", date: "2025-09-02", readMin: 12, category: "Mathematics", tags: ["Group Theory", "Equivariance", "Deep Learning"], excerpt: "Core group theory definitions and why equivariance matters in modern deep learning — from sets and binary operations to representations and the architectural constraints they imply." },
  { slug: "poisson-distribution", title: "The Poisson Distribution: Your Key to Predicting the Unforeseeable", date: "2025-02-22", readMin: 8, category: "Statistics", tags: ["Probability", "Astronomy", "Python"], excerpt: "A practical guide to modeling counts of rare events and understanding Poisson noise — with worked astronomy examples and a reusable Python notebook." },
  { slug: "dockerize-jupyterlab", title: "Dockerize Your Data Science Workflow: JupyterLab on a Private Linux Machine", date: "2024-02-21", readMin: 15, category: "DevOps", tags: ["Docker", "Jupyter", "Linux"], excerpt: "Set up a Dockerized JupyterLab on a private server for secure, reproducible data science work — conda env layering, GPU passthrough, HTTPS via Caddy." },
  { slug: "gaussian-distribution", title: "Exploring the Gaussian Distribution: The Math Behind the Bell-Shaped Curve", date: "2024-02-15", readMin: 10, category: "Statistics", tags: ["Probability", "Linear Algebra"], excerpt: "Understanding the bell-shaped curve from first principles: PDF derivation, the empirical rule, the Central Limit Theorem in plain English, and practical intuition." },
];

const COURSES = [
  { code: "CSC 100", title: "Introduction to Problem Solving with Python", role: "TA Tutorial", term: "Spring 2026", inst: "IUB", lang: "Python", desc: "A structured CSC 100 tutorial sequence on Python fundamentals, control flow, functions, loops, and list-based problem solving.", color: "blue" },
  { code: "CSC 101", title: "Introduction to Programming with Python", role: "TA Tutorial", term: "Fall 2022 — Spring 2023", inst: "IUB", lang: "Python", desc: "Step-by-step Python tutorials for beginners, focused on computational thinking and practical coding.", color: "blue" },
  { code: "CSE 214", title: "Data Structures", role: "TA Tutorial", term: "Autumn 2022", inst: "IUB", lang: "Python", desc: "Tutorial sessions on foundational data structures and problem solving.", color: "violet" },
  { code: "CSE 111", title: "Fundamentals of Computer Systems", role: "TA Tutorial", term: "Spring 2023", inst: "IUB", lang: "Office", desc: "Tutorial sessions covering computer-system concepts and practical office-suite skills for academic use.", color: "amber" },
  { code: "CSE 317", title: "Numerical Methods Lab", role: "TA Lab", term: "Autumn 2022", inst: "IUB", lang: "Python", desc: "Lab worksheets and assignments for numerical methods using Python.", color: "green" },
];

const COURSE_DETAIL_CSC100 = {
  code: "CSC 100", title: "Introduction to Problem Solving with Python (Tutorial)", inst: "Independent University, Bangladesh", role: "TA", term: "Spring 2026", students: 36, repo: "https://github.com/mirsazzathossain/CSC101-Introduction-to-Computer-Science",
  syllabus: "This tutorial stream is practice-first: each topic starts with a short concept pass, then coding drills, then problem solving. Focus is on clean logic, readable code, and debugging through code-tracing.",
  outcome: "Students can solve beginner Python problems independently using conditionals, loops, functions, and list-processing patterns.",
  schedule: [
    { week: "Tutorial 01–02", topic: "Getting started: variables, basic I/O, and expressions" },
    { week: "Tutorial 03–04", topic: "Numbers, variables, typed input, and arithmetic workflows" },
    { week: "Tutorial 05–06", topic: "Boolean logic, operators, and nested conditional decision-making" },
    { week: "Tutorial 07–08", topic: "Function decomposition, loops, and core numeric problem patterns" },
    { week: "Tutorial 09–10", topic: "Lists, built-in list methods, and custom list-processing functions" },
  ],
  notebooks: [
    { n: "01", title: "Getting started: variables, basic I/O, and expressions" },
    { n: "02", title: "Print formatting in depth: sep, end, newline, and output control" },
    { n: "03", title: "Numbers and understanding data through structured output and variable practice" },
    { n: "04", title: "Variable input, type-casting, and arithmetic workflows" },
    { n: "05", title: "Boolean logic and arithmetic operators with truth-table reasoning" },
    { n: "06", title: "Conditional statements, including nested conditionals and branching logic" },
    { n: "07", title: "Basic function decomposition and extended conditional problem-solving" },
    { n: "08", title: "Loops: numeric series, factorial, prime tests, and Fibonacci" },
    { n: "09", title: "Lists with loops and core list built-in functions" },
    { n: "10", title: "Custom list-processing functions and integrated practice" },
  ],
  resources: [{ title: "Python 3 official documentation", href: "https://docs.python.org/3/" }, { title: "Think Python (Allen Downey)", href: "https://greenteapress.com/wp/think-python-2e/" }, { title: "Course GitHub repository", href: "#" }],
};

const PROJECTS = [
  { name: "RGC", glyph: "🌌", desc: "Radio Galaxy Classifier — a Python package for processing and classifying radio galaxy images.", tags: ["Python", "Astronomy", "CNN"], stars: 14, lang: "Python", langColor: "#3572A5", href: "#" },
  { name: "FedCTTA", glyph: "🛰", desc: "Reference implementation for collaborative continual test-time adaptation in federated settings.", tags: ["PyTorch", "Federated"], stars: 7, lang: "Python", langColor: "#3572A5", href: "#" },
  { name: "LiteSRNet", glyph: "🔭", desc: "Lightweight recurrent network for image super-resolution. Trained, efficient, < 200K params.", tags: ["PyTorch", "Super-resolution"], stars: 22, lang: "Python", langColor: "#3572A5", href: "#" },
  { name: "BDLensing", glyph: "🌀", desc: "Strong gravitational lensing pipeline used for the A&A submission on massive ellipticals.", tags: ["Astropy", "GLAFIC"], stars: 5, lang: "Python", langColor: "#3572A5", href: "#" },
  { name: "Astro Labeller", glyph: "🏷", desc: "Django-based collaborative tool for labeling astronomical images by category.", tags: ["Django", "Tooling"], stars: 9, lang: "Python", langColor: "#3572A5", href: "#" },
  { name: "test-time-adaptation", glyph: "🔁", desc: "Library bundling baselines and the SloMo-Fast method for source-free continual TTA.", tags: ["PyTorch", "Domain shift"], stars: 18, lang: "Python", langColor: "#3572A5", href: "#" },
  { name: "Spotify Playing Now", glyph: "🎧", desc: "A card for showing your currently playing Spotify song on your GitHub profile README.", tags: ["Node", "Vercel"], stars: 31, lang: "JavaScript", langColor: "#f1e05a", href: "#" },
  { name: "Restaurant USTGCN", glyph: "🍽", desc: "Real-time food order prediction using Unified Spatio-Temporal Graph Convolutional Network.", tags: ["PyTorch", "GNN"], stars: 4, lang: "Python", langColor: "#3572A5", href: "#" },
];

const SNIPPETS = [
  { slug: "ssh-tunnelling-jupyter", title: "Running Jupyter on a Remote Server and Connecting Locally", desc: "How to run Jupyter on a remote server and connect to it locally, using SSH tunnels.", tags: ["bash", "ssh", "jupyter"], lang: "bash", date: "2024-09-12",
    steps: [
      { title: "Create a tmux or screen session on the remote server", code: "# tmux\ntmux new -s jupyter\n\n# screen\nscreen -S jupyter" },
      { title: "Start Jupyter on the remote server", code: "jupyter notebook --no-browser --port=8889", note: "Copy the token from the output of the above command and save it somewhere." },
      { title: "Detach from the tmux or screen session", code: "# tmux\nCtrl + b, d\n\n# screen\nCtrl + a, d" },
      { title: "Create an SSH tunnel from the local machine to the remote server", code: "ssh -N -f -L localhost:8888:localhost:8889 user@remote-server" },
      { title: "Open Jupyter in the browser", code: "Open http://localhost:8888 in the browser and enter the token from earlier." },
      { title: "Reattach to the tmux or screen session", code: "# tmux\ntmux attach -t jupyter\n\n# screen\nscreen -r jupyter" },
      { title: "Kill the tmux or screen session", code: "# tmux\ntmux kill-session -t jupyter\n\n# screen\nscreen -X -S jupyter quit" },
    ] },
  { slug: "ssh-tunneling-private-server", title: "Accessing a Private Server via SSH Tunneling", desc: "How to access a private server behind a firewall using SSH tunneling.", tags: ["bash", "ssh"], lang: "bash", date: "2024-08-04",
    steps: [
      { title: "Add a tunnel config to ~/.ssh/config", code: "Host bastion\n  HostName bastion.example.com\n  User you\n\nHost private\n  HostName 10.0.0.5\n  User you\n  ProxyJump bastion" },
      { title: "Connect through the bastion", code: "ssh private" },
    ] },
  { slug: "pytorch-determinism", title: "Reproducible PyTorch Training: Seeds Done Right", desc: "Cover all sources of nondeterminism — Python, NumPy, PyTorch, CUDA, DataLoader workers.", tags: ["python", "pytorch", "reproducibility"], lang: "python", date: "2024-06-19",
    steps: [
      { title: "Seed everything", code: "import os, random, numpy as np, torch\n\ndef seed_everything(seed: int = 42):\n    os.environ['PYTHONHASHSEED'] = str(seed)\n    random.seed(seed); np.random.seed(seed)\n    torch.manual_seed(seed); torch.cuda.manual_seed_all(seed)\n    torch.backends.cudnn.deterministic = True\n    torch.backends.cudnn.benchmark = False" },
      { title: "Make DataLoader workers deterministic", code: "def worker_init_fn(worker_id):\n    seed = torch.initial_seed() % 2**32\n    np.random.seed(seed); random.seed(seed)\n\nloader = torch.utils.data.DataLoader(..., worker_init_fn=worker_init_fn)" },
    ] },
  { slug: "conda-clone-cross-os", title: "Conda Environment Cloning Across Machines", desc: "Reliably re-create a conda env on a different OS using --from-history and pip exports.", tags: ["bash", "conda"], lang: "bash", date: "2024-04-29",
    steps: [
      { title: "Export only what you asked for", code: "conda env export --from-history > environment.yml" },
      { title: "Re-create on the other machine", code: "conda env create -f environment.yml -n myenv\nconda activate myenv\npip install -r requirements.txt" },
    ] },
  { slug: "compact-latex-tables", title: "Compact LaTeX Tables That Actually Fit", desc: "booktabs + adjustbox + sensible column types — never fight overfull boxes again.", tags: ["latex"], lang: "latex", date: "2024-02-08",
    steps: [
      { title: "Preamble", code: "\\usepackage{booktabs}\n\\usepackage{adjustbox}\n\\usepackage{siunitx}" },
      { title: "Adjust-boxed table", code: "\\begin{table}[t]\n  \\centering\n  \\begin{adjustbox}{max width=\\linewidth}\n    \\begin{tabular}{lcc}\n      \\toprule\n      Method & PSNR & SSIM \\\\\n      \\midrule\n      Bicubic & 28.42 & 0.810 \\\\\n      Ours    & 30.11 & 0.864 \\\\\n      \\bottomrule\n    \\end{tabular}\n  \\end{adjustbox}\n\\end{table}" },
    ] },
  { slug: "tensorboard-hpc", title: "Tensorboard via Reverse SSH for HPC", desc: "Connect to a tensorboard instance on a compute node behind a login node.", tags: ["bash", "ssh", "hpc"], lang: "bash", date: "2023-11-21",
    steps: [
      { title: "Launch tensorboard on the compute node", code: "tensorboard --logdir runs --port 6006 --bind_all" },
      { title: "Forward through the login node", code: "ssh -N -L 6006:compute-node:6006 you@login.cluster.edu" },
    ] },
];

const RESOURCES = [
  { topic: "Computer Vision", items: [
    { source: "blog.paperspace.com", title: "Handling Class Imbalance via Class Weights", desc: "How to handle overfitting due to class imbalance in image datasets." },
    { source: "github.com", title: "ViT Implementation in PyTorch", desc: "Implementation of SOTA Vision Transformer models using PyTorch." },
    { source: "lilianweng.github.io", title: "What are Diffusion Models?", desc: "Lil'Log's reference primer on score-based generative models." },
  ] },
  { topic: "Machine Learning", items: [
    { source: "notesonai.com", title: "Notes on AI", desc: "A collection of notes on AI, Deep Learning, and Machine Learning." },
    { source: "distill.pub", title: "Distill — Visual Explanations", desc: "Beautifully illustrated explanations of ML concepts — gold standard for the craft." },
  ] },
  { topic: "Natural Language Processing", items: [
    { source: "nlp.seas.harvard.edu", title: "The Annotated Transformer", desc: "A detailed explanation of the Transformer model with code." },
    { source: "huggingface.co", title: "HuggingFace NLP Course", desc: "Free, hands-on course covering tokenizers, models, and fine-tuning." },
  ] },
  { topic: "Mathematics for ML", items: [
    { source: "mml-book.github.io", title: "Mathematics for Machine Learning", desc: "Free textbook covering linear algebra, analytic geometry, probability and optimization." },
    { source: "joshua.smcvt.edu", title: "Linear Algebra (Hefferon)", desc: "An accessible, worked-example heavy introduction to linear algebra." },
  ] },
];

const CV = {
  education: [{ org: "Independent University, Bangladesh", role: "BSc, Computer Science and Engineering — Minor in Engineering Mathematics", time: "2017 — 2021", meta: "CGPA 3.64 / 4.00 · Magna Cum Laude" }],
  research: [
    { org: "Center for Computational & Data Sciences (CCDS), IUB", role: "Junior Research Scientist", time: "Jul 2024 — Present", bullets: ["Lead projects on continual test-time adaptation, vision-language model adaptation, and Bangla NLP benchmarking.", "6 peer-reviewed publications (incl. WACV, ICIP, IJCNN); supervising 4 undergraduate theses."] },
    { org: "CCDS, IUB", role: "Post-baccalaureate Research Assistant", time: "Feb 2022 — Jun 2024", bullets: ["Developed RNN-based image super-resolution (ICIP 2024); group-equivariant CNN for radio galaxy classification (IJCNN 2023).", "Co-authored 4 papers; mentored 6 undergraduate thesis projects."] },
  ],
  industry: [{ org: "Postex Global Services", role: "ML Engineer (consulting)", time: "Aug 2023 — Present", bullets: ["Conversational AI integration in a customer-facing chatbot.", "ML pipelines for delivery-telemetry risk scoring."] }],
  teaching: [
    { org: "IUB, Dept. of CSE", role: "Post-baccalaureate Teaching Assistant", time: "May 2021 — Jan 2022", bullets: ["Prepared lab materials, conducted support sessions."] },
    { org: "IUB, Dept. of Physical Sciences", role: "Undergraduate Teaching Assistant — Math Tutorial Center", time: "Oct 2019 — Apr 2021", bullets: ["Tutored students struggling with mathematics."] },
  ],
  awards: [
    { title: "Best Long Paper Award, BLP 2025 @ EMNLP", time: "Nov 2025", icon: "🏆", credentialUrl: "https://aclanthology.org/2025.blp-1.0/", credentialLabel: "View at ACL Anthology" },
    { title: "IEEE Signal Processing Society Travel Grant — ICIP 2024", time: "Oct 2024", icon: "💰", credentialUrl: "https://signalprocessingsociety.org/community-involvement/icip-travel-grant", credentialLabel: "Grant program" },
    { title: "Dean's Merit List × 4 — IUB", time: "2018 — 2021", icon: "🎓" },
    { title: "ICPC Asia Dhaka Regional Contestant", time: "2019", icon: "🏅", credentialUrl: "https://icpc.global/regionals/finder/dhaka-2019", credentialLabel: "ICPC archive" },
  ],
  skills: { Languages: ["Python", "C/C++", "JavaScript"], Libraries: ["PyTorch", "Lightning", "HuggingFace", "scikit-learn", "NumPy"], Web: ["Django", "Astro", "React"], Misc: ["LaTeX", "Git", "Docker", "AWS", "MLflow", "W&B"] },
  talks: [
    { title: "FedCTTA: Collaborative Continual Test-Time Adaptation in Federated Learning", venue: "IJCNN 2025", location: "Rome, Italy", date: "2025-07", type: "oral", slidesUrl: "https://mirsazzathossain.me/files/fedctta-presentation.pdf" },
    { title: "RGC-BENT: A Novel Dataset for BENT Radio Galaxy Classification", venue: "ICIP 2025", location: "Anchorage, USA", date: "2025-09", type: "oral", slidesUrl: "#" },
    { title: "Lightweight Recurrent Network for Super-Resolution", venue: "ICIP 2024", location: "Abu Dhabi, UAE", date: "2024-10", type: "poster", slidesUrl: "https://mirsazzathossain.me/files/super-resolution-icip2024-poster.pdf" },
    { title: "Group-Equivariant CNNs for Radio Galaxy Morphology", venue: "INNS-DLIA @ IJCNN 2023", location: "Online", date: "2023-08", type: "workshop", slidesUrl: "https://mirsazzathossain.me/files/rgc-inns-dlia-2023-presentation.pdf" },
  ],
  service: [
    { venue: "ICIP", year: 2025, role: "Reviewer", type: "review" },
    { venue: "WACV", year: 2026, role: "Reviewer", type: "review" },
    { venue: "BLP @ EMNLP", year: 2025, role: "Reviewer", type: "review" },
    { venue: "AAAI", year: 2026, role: "Sub-reviewer", type: "review" },
  ],
  press: [
    { title: "Computational Biology Workshop at BRAC University", outlet: "Bigganchinta · Prothom Alo", date: "2025-01-08", url: "https://bigganchinta.com/", desc: "Served as instructor at a 3-day national workshop on computational biology and ML for biological data analysis, organised by BRAC University." },
    { title: "ICIP 2024 — Travel Grant Recipient Highlight", outlet: "IEEE Signal Processing Society", date: "2024-09-22", url: "https://signalprocessingsociety.org/", desc: "Featured among the 2024 cohort of student travel grant recipients for ICIP 2024 in Abu Dhabi." },
  ],
};

const TIMELINE_BY_YEAR = [
  { year: 2026, items: [
    { kind: "paper", text: "Two papers accepted at ICIP 2025 — BD Open LULC Map and RGC-BENT." },
  ] },
  { year: 2025, items: [
    { kind: "award", text: "Best Long Paper at BLP 2025 (EMNLP workshop) for Bangla dialect benchmarking." },
    { kind: "paper", text: "FedCTTA accepted at IJCNN 2025 in Rome." },
    { kind: "career", text: "Promoted to Junior Research Scientist at CCDS." },
  ] },
  { year: 2024, items: [
    { kind: "award", text: "$1,000 IEEE Signal Processing Society travel grant for ICIP 2024." },
    { kind: "paper", text: "ICIP 2024 — Lightweight Recurrent Network for Image Super-Resolution." },
  ] },
  { year: 2023, items: [
    { kind: "paper", text: "First paper accepted at IJCNN 2023 INNS-DLIA workshop." },
  ] },
  { year: 2022, items: [
    { kind: "career", text: "Joined CCDS as a Research Assistant." },
  ] },
  { year: 2021, items: [
    { kind: "milestone", text: "Graduated from IUB with a BSc in Computer Science and Engineering." },
  ] },
  { year: 2017, items: [
    { kind: "milestone", text: "Admitted to IUB as a CSE undergraduate." },
  ] },
];

// Avail: a typical academic calendar week
const AVAILABILITY = {
  tz: "Asia/Dhaka · UTC+6",
  rangeLabel: "Apr 27 – May 3, 2026",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  dates: ["Apr 27", "Apr 28", "Apr 29", "Apr 30", "May 1", "May 2", "May 3"],
  hours: ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "9pm", "10pm", "11pm"],
  // status grid: rows = hours, cols = days. f=free, b=busy, h=holiday-tinted (sun)
  grid: [
    "fffffff", "fffffff", "fffffff",
    "fffffff", "bfffffb", "fffbffb",
    "fbbffff", "fffffff", "fffffff",
    "bffffff", "fffffff",
  ],
};

Object.assign(window, { SITE, NEWS, PUBLICATIONS, POSTS, COURSES, COURSE_DETAIL_CSC100, PROJECTS, SNIPPETS, RESOURCES, CV, TIMELINE_BY_YEAR, AVAILABILITY });
