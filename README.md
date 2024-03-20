# FileDev

FileDev is a file management system that allows users to upload, delete, download files, and restore deleted files. Deleted files are automatically marked for deletion and removed permanently after three days. Additionally, users can create organizations, add members, and assign roles (admin or member). Admins have the privilege to delete files, while members can only add files but cannot delete them. Currently, the system supports image file types: PNG, PDF, and CSV.

## Features

- **File Upload**: Users can upload files to the system.
  
- **File Deletion**: Admins can delete files from the system.

- **File Download**: Users can download files from the system.

- **File Restoration**: Deleted files can be restored within a certain timeframe before being permanently deleted.

- **Automatic Deletion**: Files marked as deleted are automatically removed from the system after three days.

- **Organization Management**: Users can create organizations and manage members within them.

- **Role Management**: Admins can assign roles (admin or member) to organization members.

## Technologies Used

- **Next.js**: Next.js is a React framework for building server-side rendered and statically generated web applications.

- **TypeScript**: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework for quickly building custom designs.

- **Shadcn**: (Please provide a brief description of Shadcn if it's not a widely known technology)

- **Convex**: Convex is a backend service for managing state in Next.js applications.

- **Auth Service**: Clerk provides authentication services for secure user authentication.

## Live Demo

[Insert Live Demo Link Here]

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
Install dependencies:
bash

cd FileDev
npm install
Save to grepper
Run the development server:
bash

npm run dev
Save to grepper
Open your browser and navigate to http://localhost:3000.
Configuration
Environment Variables: Set up environment variables for configuration, including API keys, database URLs, etc.
Supported File Types
Images: PNG, PDF, CSV
Usage
[Provide instructions on how to use your project, including
