import Profile from "./Profile";
import Hobby from "./subcomponents/Hobby";
import Home from "./subcomponents/Home";
import Projects from "./subcomponents/Projects";
import Services from "./subcomponents/Services";
import Skills from "./subcomponents/Skills";
import Testimony from "./subcomponents/Testimony";
import Users from "./subcomponents/Users";

export default function Main({ activeSection }) {
  let content;
  switch (activeSection) {
    case "home":
      content = (
        <div>
          {" "}
          <Home />{" "}
        </div>
      );
      break;
    case "users":
      content = (
        <div>
          {" "}
          <Users />
        </div>
      );
      break;
    case "projects":
      content = (
        <div>
          {" "}
          <Projects />{" "}
        </div>
      );
      break;
    case "services":
      content = (
        <div>
          {" "}
          <Services />{" "}
        </div>
      );
      break;
    case "skills":
      content = (
        <div>
          {" "}
          <Skills />{" "}
        </div>
      );
      break;
    case "hobbies":
      content = (
        <div>
          {" "}
          <Hobby />{" "}
        </div>
      );
      break;
    case "testimonials":
      content = (
        <div>
          {" "}
          <Testimony />{" "}
        </div>
      );
      break;
    case "profile":
      content = (
        <div>
          <Profile />
        </div>
      );
      break;
    default:
      content = <div>Select a section from the side bar</div>;
  }

  return (
    <div className="p-6 bg-gray-100 w-full">
      <div>{content}</div>
    </div>
  );
}
