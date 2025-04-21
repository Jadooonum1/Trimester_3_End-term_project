# JobTrack - Application Tracker

A modern, responsive job application tracking system built with React and Tailwind CSS. Keep track of your job applications, interviews, and professional contacts all in one place.

## Features

- **Application Management**
  - Track job applications with detailed information
  - Monitor application status (Applied, Interviewing, Offer, Rejected)
  - Store job descriptions, salary information, and important dates
  - Add notes and next steps for each application

- **Contact Management**
  - Maintain a database of professional contacts
  - Store contact details including name, email, phone, and company
  - Add notes about interactions and relationships

- **Dashboard Analytics**
  - View application statistics at a glance
  - Track response rates and application outcomes
  - Monitor upcoming interviews and deadlines

- **Smart Search**
  - Search through applications and contacts
  - Filter applications by status
  - Sort and organize your job search data

## Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Date Formatting**: date-fns
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React Context for state management
├── pages/             # Page components
├── services/          # API and service functions
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Key Components

- **Dashboard**: Overview of application statistics and recent activities
- **Applications**: List and manage job applications
- **Contacts**: Track professional contacts and networking
- **Settings**: User preferences and account settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- UI components inspired by modern design practices
- Built with [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
