const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  console.log("🚀 ~ Content ~ props:", props);
  return (
    <>
      {props.parts.map((item) => {
        console.log("🚀 ~ {props.map ~ item:", item);
        return (
          <p key={item.name}>
            {item.name} {item.exercises}
          </p>
        );
      })}
    </>
  );
};

const Total = (props) => {
  console.log("🚀 ~ Total ~ props:", props);
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.parts.reduce(
          (accumulator, currentValue) => accumulator + currentValue.exercises,
          0
        )}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
