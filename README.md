# Calorie Tracker

A simple React application to track calorie intake and calories burned through food and exercise activities.

## Features

- Add, edit, and delete food or exercise activities
- Track calories consumed, burned, and net difference
- Persistent data storage using localStorage
- Responsive and modern UI with Tailwind CSS

## Project Structure

```
.
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── reducers/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig*.json
├── vite.config.ts
└── README.md
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/calorie-tracker.git
   cd calorie-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [uuid](https://www.npmjs.com/package/uuid)
- [Heroicons](https://heroicons.com/)

## How to use

1. Add a food or exercise activity using the form.
2. View the summary of calories consumed, burned, and the net difference.
3. Edit or delete activities from the list.
4. Use the "Restart app" button to clear all activities.

## Live Demo

[https://calm-selkie-3e98bf.netlify.app/](https://calm-selkie-3e98bf.netlify.app/)