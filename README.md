# Nairobi DevOps Community

A modern, responsive web application for the Nairobi DevOps Community. Built with React, TypeScript, Vite, and Tailwind CSS.

---

## Table of Contents

- [Nairobi DevOps Community](#nairobi-devops-community)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Data Folder](#data-folder)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
    - [How to Contribute](#how-to-contribute)
  - [License](#license)

---

## About

This platform empowers developers, automation experts, and tech enthusiasts to learn, network, and advance DevOps practices in Kenya's vibrant technology ecosystem. It features event management, community resources, and collaborative tools.

---

## Features

- Modern, responsive UI with dark mode
- Event and gallery management (static/demo only)
- Community and partner sections
- Modular, scalable codebase

---

## Tech Stack

- React (with hooks)
- TypeScript
- Vite
- Tailwind CSS
- Radix UI, Lucide Icons, Framer Motion, Wouter, React Query

---

## Project Structure

```
NairobiDevOps-1/
  client/         # React frontend (src/, components/, pages/, contexts/, hooks/, etc.)
  client/src/data/ # Static data files (testimonials, gallery images, partners, etc.)
  components.json # UI config
  tailwind.config.ts # Tailwind CSS config
  tsconfig.json   # TypeScript config
  vite.config.ts  # Vite config
  package.json    # Project dependencies and scripts
```

---

## Data Folder

The `client/src/data/` directory contains static data used throughout the application. This includes:

- **testimonialsData.ts**: Member testimonials displayed on the site
- **galleryData.ts**: Image URLs and metadata for the gallery section
- **partnersData.ts**: Information about community partners and sponsors
- **whatWeDoData.ts**: Details about the community's activities and offerings
---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd NDCsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   - The app will be available at `http://localhost:5173` or `http://localhost:4000` (default Vite port).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## Scripts

- `npm run dev` — Start the app in development mode (with Vite and hot reload)
- `npm run build` — Build the client for production
- `npm run preview` — Preview the production build locally


---

## Code Style

This project uses **Prettier** as the source of truth for code formatting and **ESLint** for code quality rules.

- `npm run format` — Format all files with Prettier
- `npm run format:check` — Check if files are formatted (used in CI)
- `npm run lint` — Run ESLint for code quality checks

Prettier and ESLint are configured to work together without conflicts via `eslint-config-prettier`.

---

## Contributing
We welcome contributions to enhance the Nairobi DevOps Community Platform! Whether it's fixing bugs, adding features, or improving documentation, your help is appreciated.
### How to Contribute
To contribute, please follow these steps:
  1. Clone the repository:
     ```bash
     git clone <repo-url>
     cd NDCsite
     ```
  2. Create a new feature branch:
     ```bash
     git checkout -b feature/YourFeature
     ```
  3. Make your changes and commit:
     ```bash
     git commit -am 'Describe your update'
     ```
  4. Push your branch:
     ```bash
     git push origin feature/YourFeature
     ```
  5. Notify the repository maintainer to review your changes and merge them.

- Please follow the code style and commit message guidelines used in this project.

---

## License

This project is licensed under the MIT License.