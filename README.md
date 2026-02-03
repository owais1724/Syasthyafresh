# Svasthya Fresh 🌿

**Svasthya Fresh** is a premium e-commerce platform dedicated to delivering pure, natural, and honest products like wild honey, handcrafted chikkis, and fresh organic produce. Built with a focus on health, wellness, and transparency.

![Svasthya Fresh Banner](/public/images/hero-honey-v2.png)

## ✨ Features

- **Premium UI/UX**: A modern, clean, and elegant interface designed with `Tailwind CSS` and custom Serif typography.
- **Dynamic Animations**: Smooth scroll animations and element reveals using `GSAP` and `ScrollTrigger`.
- **Product Showcase**: specialized sections for Honey, Chikki, and 'Coming Soon' products with high-quality imagery.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Interactive Elements**: Hover effects, category scrolling, and product detail views.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Ready for Vercel / Netlify

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/svasthya-fresh.git
    cd svasthya-fresh
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```bash
svasthyafreshmain/
├── app/                  # Next.js App Directory (Routes, Layouts)
│   ├── about/            # About Page
│   ├── products/         # Product Listing & Details
│   ├── globals.css       # Global Styles & Tailwind Imports
│   ├── layout.tsx        # Root Layout
│   └── page.tsx          # Homepage
├── components/           # Reusable React Components
│   ├── Header.tsx        # Navigation Bar
│   ├── Hero.tsx          # Hero Section using GSAP
│   ├── Products.tsx      # Product Showcase Slider
│   ├── Footer.tsx        # Site Footer
│   └── ...
├── public/               # Static Assets (Images, Icons)
│   └── images/           # Product & Hero Images
└── ...
```

## 🎨 Color Palette

The design follows a nature-inspired minimalist palette:

- **Olive Green** (`#1AA60B`): Primary CTA and highlights.
- **Charcoal** (`#333333`): Primary text and headings.
- **Earth** (`#A5A58D`): Secondary text and borders.
- **Ivory** (`#F9F8F4`): Backgrounds.
- **Beige** (`#DDBEA9`): Accents.

## 📦 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

*Made with ❤️ for a Healthier Lifestyle.*
