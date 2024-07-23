import FeatureCard from "../components/FeatureCard";
import "../styles/Home.css";

const Home = () => {
  const features = [
    {
      title: "User Authentication",
      description: [
        "Sign up: Users can create a new account by providing a name, email, and password.",
        "Log in: Existing users can log in using their email and password.",
        "JSON Web Tokens (JWT): User authentication is implemented using JWT to securely authenticate and authorize users.",
      ],
    },
    {
      title: "Task Management",
      description: [
        "Create Task: Users can create new tasks by providing a title, description, and optionally selecting priority and color.",
        "View Task: Users can view all tasks they have created.",
        "Edit Task: Users can edit the details of their tasks, including the title, description, priority, and color.",
        "Delete Task: Users can delete tasks they have created.",
      ],
    },
    {
      title: "Task Details",
      description: [
        "Title: Users can provide a title for each task to describe what needs to be done.",
        "Description: Users can add a detailed description of the task to provide additional context.",
        "Priority: Users can assign a priority level to tasks (e.g., high, medium, low) to indicate their importance or urgency.",
        "Color: Users can choose a color for each task to visually categorize or differentiate tasks.",
      ],
    },
    {
      title: "User Experience",
      description: [
        "Modal Interface: Task creation and editing are facilitated through a modal interface, providing a seamless user experience.",
        "Error Handling: The application handles errors gracefully, providing meaningful error messages to users in case of failures or invalid inputs.",
        "Responsive Design: The application is designed to be responsive, ensuring a consistent user experience across different devices and screen sizes.",
        "User-Friendly UI: The user interface is intuitive and user-friendly, making it easy for users to navigate and interact with the application.",
      ],
    },
    {
      title: "Security",
      description: [
        "Secure Authentication: User authentication is implemented securely using JWT, ensuring that only authenticated users can access the application's features.",
        "Data Privacy: User data is securely stored and managed, adhering to best practices for data privacy and protection.",
      ],
    },
  ];
  return (
    <div className="home-container">
      <div className="home-heroSection">
        <div className="glassmorphic-container">
          <h1 className="home-heading">Task Manager</h1>
          <p className="tagline">Organize Your Tasks Effortlessly</p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/software-development-4439337-3726908.png?f=webp"
            alt="Sample"
            className="sample-image"
          />
        </div>
      </div>

      <div className="home-featuresSection">
        <h1>Features</h1>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
